import React from 'react'
import LessonList from '@/components/home/lessonList'
import AddLessonButton from '@/components/home/addLessonButton'

export default function Page() {
  return (
    <div className="h-screen p-4 flex flex-col items-center justify-start bg-gray-900">
        <h1 className="text-4xl text-white font-bold my-4 pt-6">Your Lessons</h1>
        
        <LessonList />
        
        <div className="mt-4">
            <AddLessonButton />
        </div>
    </div>
  )
}