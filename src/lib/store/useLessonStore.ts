import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'

type Lesson = {
    id: string;
    name: string;
    fileName: string;
    content: string;
}

type ErrorState = {
    title: string;
    message: string;
    variant: "error" | "warning";
}

type LessonStore = {
    lessons: Lesson[];
    error: ErrorState | null;
    addLesson: (lesson: Lesson) => void;
    updateLessonContent: (lessonId: string, newContent: string) => void;
    renameFile: (lessonId: string, newName: string) => void;
    clearError: () => void;
}

const isValidFileType = (fileName: string): boolean =>
  [".py", ".txt"].some((ext: string) => fileName.toLowerCase().endsWith(ext))

export const useLessonStore = create<LessonStore>()(
  persist(
    immer((set) => ({
      lessons: [],
      error: null,
      clearError: () => set({ error: null }),

      addLesson: (lesson) =>
        set((state) => {
          state.lessons.push(lesson)
        }),

      updateLessonContent: (lessonId: string, newContent: string) =>
        set((state) => {
          const lesson = state.lessons.find(l => l.id === lessonId);
          if (lesson) {
            lesson.content = newContent;
          }
        }),

      renameFile: (lessonId, newName) =>
        set((state) => {
          if (!isValidFileType(newName)) {
            state.error = {
              title: "Invalid Extension",
              message: "Files must end in .py or .txt",
              variant: "error"
            };
            return;
          }

          const lesson = state.lessons.find((l: Lesson) => l.id === lessonId);
          if (lesson) {
            lesson.fileName = newName;
          }
        }),
    })),
    { name: 'lesson-storage' }
  )
);