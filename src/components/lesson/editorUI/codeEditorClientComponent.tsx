"use client"
import { useCallback, useEffect, useRef, useState } from 'react'
import Editor from './editor'
import Toolbar from './toolBar'
import Tabs from './tabs'
import { useLessonStore } from '@/lib/store/useLessonStore'
import { RenameModal } from '../../shared/renameModal'


declare global {
  interface Window { loadPyodide: any; }
}


const CodeEditorClientComponent = ({ lessonId, setOutput }: { lessonId: string, setOutput: React.Dispatch<React.SetStateAction<string[]>> }) => {
    
    // lesson store definitions
    const currentLesson = useLessonStore((state) =>
        state.lessons.find(lesson => lesson.id === lessonId))
    const renameFile = useLessonStore((state) => state.renameFile)
    const updateFileContent = useLessonStore((state) => state.updateLessonContent)

    const [code, setCode] = useState(currentLesson?.content || "")
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const pyodideRef = useRef<any>(null);

    const handleRunCode = async () => {
        if (!currentLesson) return;

        setIsRunning(true)

        try {
            if (!pyodideRef.current) {
                pyodideRef.current = await window.loadPyodide();
            }

            const py = pyodideRef.current;

            // Redirect stdout and stderr
            py.setStdout({
                batched: (str: string) => {
                    setOutput((prev: string[]) => [...prev, str]);
                }
            });

            py.setStderr({   
                batched: (str: string) => {
                    console.log(str); 
                    setOutput(prev => [...prev, `[ERROR] ${str}`])
                }
            });

            await py.runPythonAsync(code);

        } catch (error) {
            setOutput((prev: string[]) => [...prev, `${error}`]);
        } finally {
            setIsRunning(false);
        }
    }

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
        const timerId = setTimeout(() => {
            handleSave();
        }, 1000);

        return () => clearTimeout(timerId);
    }, [code, handleSave]);

  return (
    <div className='flex flex-col w-full h-full'>
      <Toolbar onDownload={handleDownload} onRename={handleRename} onClear={handleClear} onRun={handleRunCode} isRunning={isRunning} />
      <Tabs lessonId={lessonId} />
      <RenameModal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} onRename={executeRename} currentName={currentLesson?.fileName || ""} />
      <Editor code={code} onChange={handleCodeChange} />
    </div>
  )
}

export default CodeEditorClientComponent