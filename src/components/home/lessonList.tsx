"use client"
import { useLessonStore } from '@/lib/store/useLessonStore'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle 
} from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/dist/client/link'

export default function LessonList() {
    // thinking of a list of wide cards
    const lessons = useLessonStore(state => state.lessons)
    return (
        <div className="flex flex-col gap-2 my-6 w-3/4 md:w-1/2  ">
            {lessons.map((lesson) => (
                <Card key={lesson.id} className='bg-primary text-white'>
                    <CardHeader>
                        <CardTitle>
                            <a href={`/lesson/${lesson.id}`} className="hover:underline text-xl md:text-2xl font-bold">{lesson.name}</a>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        description of the lesson
                    </CardContent>
                    <CardContent>
                        progress bar ? or something else ?
                    </CardContent>
                    <CardFooter>
                        <Button
                            asChild
                            variant="default"
                            className={`
                                px-3 py-4 text-sm md:text-md bg-blue-800 
                                hover:bg-blue-600 cursor-pointer 
                                hover:text-white hover:scale-105 
                                transition-all duration-300 ease-in-out
                                active:bg-blue-900 active:scale-95
                            `}
                        >
                            <Link href={`/lesson/${lesson.id}`}>
                                Go to Lesson
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}