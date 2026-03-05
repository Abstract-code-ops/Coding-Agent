"use client"

import { useLessonStore } from '@/lib/store/useLessonStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddLessonButton() {
    const addLesson = useLessonStore(state => state.addLesson)
    const router = useRouter()

    const [showNameInput, setShowNameInput] = useState(false)
    const [lessonName, setLessonName] = useState("")

    const handleAddLesson = () => {
        const id = crypto.randomUUID()
        const file = {
            id: crypto.randomUUID(),
            name: lessonName ? `${lessonName}.py` : "untitled.py",
            content: "# Start coding here..."
        }
        const newLesson = {
            id,
            name: lessonName || "Untitled Lesson",
            files: [file],
            activeFileId: file.id
        }
        addLesson(newLesson)
        router.push(`/lesson/${id}`)
    }

    return (
        <div className='flex flex-col justify-center'>
            <button onClick={() => setShowNameInput(true)} className="p-2 bg-blue-500 text-white rounded cursor-pointer">
                Add a Lesson
            </button>
            {showNameInput && (
                // I will change this to a modal
                <div className="mt-2">
                    <input 
                        type="text" 
                        value={lessonName} 
                        onChange={(e) => setLessonName(e.target.value)} 
                        className="p-2 border rounded"
                    />
                    <button onClick={handleAddLesson} className="p-2 ml-2 bg-blue-500 text-white rounded cursor-pointer">
                        Create
                    </button>
                    <button onClick={() => setShowNameInput(false)} className="p-2 ml-2 bg-red-500 text-white rounded cursor-pointer">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}