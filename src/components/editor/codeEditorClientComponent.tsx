"use client"
import { useCallback, useEffect, useRef, useState } from 'react'
import Editor from './editor'
import Toolbar from './toolBar'
import Tabs from './tabs'
import { useLessonStore } from '@/lib/store/useLessonStore'


const CodeEditorClientComponent = ({ lessonId }: { lessonId: string}) => {
    const currentLesson = useLessonStore((state) =>
        state.lessons.find(lesson => lesson.id === lessonId))
    const updateFileContent = useLessonStore((state) => state.updateFileContent)
    const addFile = useLessonStore((state) => state.addFileToLesson)
    const renameFile = useLessonStore((state) => state.renameFile)
    const files = currentLesson?.files || []
    const activeFile = files.find(file => file.id === currentLesson?.activeFileId)

    const [code, setCode] = useState(activeFile?.content || "")

    const filePlaceholder = {
        id: crypto.randomUUID(),
        name: "untitled.py",
        content: "# Start coding here..."
    }

    const handleAddFile = () => {
        if (!lessonId) return
        addFile(lessonId, filePlaceholder)
        console.log("added file")
        console.log(currentLesson?.files)
    }

    const handleCodeChange = ((value: string) => {
        setCode(value)
    })

    const handleClear = () => {
        setCode("")
    }

    const handleSave = useCallback(() => {
        if (!activeFile || !lessonId) return // No active file or lesson, can't save

        updateFileContent(lessonId, activeFile.id, code)

    }, [activeFile, lessonId, updateFileContent, code])

    const handleDownload = () => {

        handleSave()

        const blob = new Blob([code || ""], { type: "text/x-python" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = currentLesson?.name ? `${currentLesson.name}.py` : "code.py";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleRename = () => {
        console.log("rename file")
        if (!activeFile || !lessonId) return // No active file or lesson, can't rename
        const newFileName = prompt("Enter a new name for the file:", activeFile.name);
        if (newFileName) {
            renameFile(lessonId, activeFile.id, newFileName);
        }
        console.log("renamed file: ", activeFile.name)
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

    useEffect(() => {
        if (activeFile) {
            setCode(activeFile.content)
        }
    }, [activeFile])

  return (
    <>
      <Toolbar lessonId={lessonId} onClear={handleClear} onDownload={handleDownload} onSave={handleSave} onAdd={handleAddFile} onRename={handleRename} />
      <Tabs lessonId={lessonId} activeFileId={currentLesson?.activeFileId} />
      {activeFile && <Editor key={activeFile.id} code={code} onChange={handleCodeChange} />}
    </>
  )
}

export default CodeEditorClientComponent