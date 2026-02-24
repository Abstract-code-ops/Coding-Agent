"use client"
import { useLessonStore } from '@/lib/store/useLessonStore'
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle 
} from '../ui/card'

export default function LessonList() {
    const lessons = useLessonStore(state => state.lessons)
    return (
        <div className="flex flex-col gap-2 my-6 w-1/2  ">
            {lessons.map((lesson) => (
                <Card key={lesson.id}>
                    <CardHeader>
                        <CardTitle>
                            <a href={`/lesson/${lesson.id}`} className="text-white hover:underline">{lesson.name}</a>
                        </CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}