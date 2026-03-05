import { useState, useRef, useEffect } from 'react'
import { useLessonStore } from "@/lib/store/useLessonStore"
import { Code } from "lucide-react"

interface TabItemProps {
  lessonId: string
  name?: string
}

export const TabItem = ({ lessonId, name }: TabItemProps) => {
  const currentLesson = useLessonStore((state) =>
    state.lessons.find(lesson => lesson.id === lessonId))
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name || "");
  const renameFile = useLessonStore((state) => state.renameFile);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleRename = () => {
    if (newName !== name && newName.trim() !== "") {
      renameFile(lessonId, newName);
    } else {
      setNewName(name || ""); // Reset to original if empty or unchanged
    }
    setIsEditing(false);
  };

  return (
    <button 
      className={`
        group relative flex items-center gap-2 px-4 py-2.5 min-w-fit
        border-r border-[#2d2d2d] transition-colors
        bg-[#252526] text-gray-400 hover:bg-[#2a2a2b] border-t-2 border-t-transparent
      `}
      onDoubleClick={() => setIsEditing(true)}
    >
      <span className="text-sm">
        {currentLesson?.fileName?.endsWith('.txt') ? '📄' : <Code size={14} />}
      </span>
      
      {isEditing ? (
        <input
          ref={inputRef}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === 'Enter' && handleRename()}
          className="bg-[#1e1e1e] border border-blue-500 outline-none px-1 text-sm font-medium rounded w-24"
          onClick={(e) => e.stopPropagation()} // Prevent tab switching while typing
        />
      ) : (
        <span className="text-sm font-medium whitespace-nowrap">
          {currentLesson?.fileName || "Untitled.py"}
        </span>
      )}
    </button>
  );
};