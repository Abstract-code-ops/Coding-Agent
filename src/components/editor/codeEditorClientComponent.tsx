"use client"
import { useCallback, useEffect, useRef, useState } from 'react'
import Editor from './editor'
import Toolbar from './toolBar'
import Tabs from './tabs'
import { useLessonStore } from '@/lib/store/useLessonStore'
import { RenameModal } from '../shared/renameModal'
import { current } from 'immer'


const CodeEditorClientComponent = ({ lessonId }: { lessonId: string}) => {
    const currentLesson = useLessonStore((state) =>
        state.lessons.find(lesson => lesson.id === lessonId))
    const renameFile = useLessonStore((state) => state.renameFile)
    const updateFileContent = useLessonStore((state) => state.updateLessonContent)

    const [code, setCode] = useState(currentLesson?.content || "")
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    const handleCodeChange = ((value: string) => {
        setCode(value)
    })

    const handleSave = useCallback(() => {

        updateFileContent(lessonId, code)

    }, [lessonId, updateFileContent, code])

    const handleDownload = () => {

        handleSave()

        const blob = new Blob([code || ""], { type: "text/x-python" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = currentLesson?.fileName ? `${currentLesson.fileName}.py` : "code.py";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleRename = () => {
        setIsRenameModalOpen(true);
    };

    const executeRename = (newName: string) => {
        if (lessonId) {
            renameFile(lessonId, newName);
        }
    };

    const handleClear = () => {
        updateFileContent(lessonId, "")
        setCode("")
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleSave])

    useEffect(() => {
        const timerId = setTimeout(() => {
            handleSave();
        }, 1000);

        return () => clearTimeout(timerId);
    }, [code, handleSave]);

  return (
    <div className='flex flex-col w-full h-full'>
      <Toolbar lessonId={lessonId} onDownload={handleDownload} onRename={handleRename} onClear={handleClear} />
      <Tabs lessonId={lessonId} />
      <RenameModal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} onRename={executeRename} currentName={currentLesson?.fileName || ""} />
      <Editor code={code} onChange={handleCodeChange} />
    </div>
  )
}

export default CodeEditorClientComponent