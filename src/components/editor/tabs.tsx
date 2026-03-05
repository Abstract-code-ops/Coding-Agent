import { useLessonStore } from "@/lib/store/useLessonStore"
import { TabItem } from "./tabItem"

interface TabProps {
  lessonId ?: string
}

const Tabs = ({ lessonId}: TabProps) => {
  
  const lesson = useLessonStore((state) => 
    state.lessons.find(lesson => lesson.id === lessonId)
  )


  return (
    <div>
      <div className="flex border-b border-gray-300 bg-[#21252b] overflow-x-scroll no-scrollbar">
          <TabItem lessonId={lessonId || ""} name={lesson?.fileName || "Untitled.py"} />
      </div>
    </div>
  )
}

export default Tabs