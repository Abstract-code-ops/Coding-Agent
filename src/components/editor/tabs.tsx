import { File, useLessonStore } from "@/lib/store/useLessonStore"
import { X, Code } from "lucide-react"

interface TabProps {
  lessonId ?: string
  activeFileId?: string
}

const Tabs = ({ lessonId, activeFileId }: TabProps) => {
  
  const lesson = useLessonStore((state) => 
    state.lessons.find(lesson => lesson.id === lessonId)
  )
  const files = lesson?.files || []
  const updateActiveFile = useLessonStore((state) => state.updateActiveFile);
  const deleteFileFromLesson = useLessonStore((state) => state.deleteFileFromLesson)

  const handleFileClick = (fileId: string) => {
      updateActiveFile(lessonId || "", fileId);
      console.log("active file id: ", fileId)
      console.log("current active file name: ", files.find(file => file.id === fileId)?.name)
  }

  const handleFileDelete = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    deleteFileFromLesson(lessonId || "", fileId);

    if (activeFileId === fileId) {
      const remainingFiles = files.filter(file => file.id !== fileId);
      if (remainingFiles.length > 0) {
        updateActiveFile(lessonId || "", remainingFiles[0].id);
      }
    }
  }

  return (
    <div>
      <div className="flex border-b border-gray-300">
        {files.map((file) => (
          <button 
            key={file.id} 
            className={`
              group relative flex items-center gap-2 px-4 py-2.5 min-w-fit
              border-r border-[#2d2d2d] transition-colors
              ${activeFileId === file.id 
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' 
                : 'bg-[#252526] text-gray-400 hover:bg-[#2a2a2b] border-t-2 border-t-transparent'
              }
            `}
            onClick={() => handleFileClick(file.id)}
          >
            {/* File icon based on extension */}
            <span className="text-sm">
              {file.name.endsWith('.txt') ? '📄' : 
               <Code size={14} />}
            </span>
            
            <span className="text-sm font-medium whitespace-nowrap">
              {file.name}
            </span>

            {/* Close button */}
            {files.length > 1 && (
              <span 
                onClick={(e) => handleFileDelete(e, file.id)}
                className="ml-2 p-0.5 rounded hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs