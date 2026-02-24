import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type File = {
    id: string;
    name: string;
    content: string;
}

type Lesson = {
    id: string;
    name: string;
    files: File[];
    activeFileId: string;
}

type LessonStore = {
    lessons: Lesson[];
    addLesson: (lesson: Lesson) => void;
    addFileToLesson: (lessonId: string, file: File) => void;
    deleteFileFromLesson: (lessonId: string, fileId: string) => void;
    updateFileContent: (lessonId: string, fileId: string, newContent: string) => void;
    updateActiveFile: (lessonId: string, fileId: string) => void;
    renameFile: (lessonId: string, fileId: string, newName: string) => void;
}

export const useLessonStore = create<LessonStore>()(persist((set) => ({
    lessons: [],
    addLesson: (lesson) =>
        set((state) => ({
            lessons: [...state.lessons, lesson],
    })),
    addFileToLesson: (lessonId, file) => set((state) => { 

        if ([".py",".txt"].every(ext => !file.name.endsWith(ext))) {
            alert("Only .py, and .txt files are allowed.");
            return state;
        }

        const index = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (index === -1) return state; // Lesson not found

        if (state.lessons[index].files.length >= 10) {
            alert("Maximum file limit reached for this lesson.");
            return state;
        }

        const updatedLessons = [...state.lessons];

        updatedLessons[index] = {
            ...updatedLessons[index],
            files: [...updatedLessons[index].files, file]
        };
        return { lessons: updatedLessons };
    }),
    deleteFileFromLesson: (lessonId, fileId) => set((state) => {
        const index = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (index === -1) return state; // Lesson not found

        const updatedLessons = [...state.lessons];

        updatedLessons[index] = {
            ...updatedLessons[index],
            files: updatedLessons[index].files.filter(file => file.id !== fileId)
        };
        return { lessons: updatedLessons };
    }),
    updateFileContent: (lessonId, fileId, newContent) => set((state) => {
        const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (lessonIndex === -1) return state; // Lesson not found

        const updatedLessons = [...state.lessons];
        const fileIndex = updatedLessons[lessonIndex].files.findIndex(file => file.id === fileId);
        if (fileIndex === -1) return state; // File not found

        updatedLessons[lessonIndex].files[fileIndex].content = newContent;
        return { lessons: updatedLessons };
    }),
    updateActiveFile: (lessonId, fileId) => set((state) => {
        const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (lessonIndex === -1) return state; // Lesson not found

        const updatedLessons = [...state.lessons];
        updatedLessons[lessonIndex] = {
            ...updatedLessons[lessonIndex],
            activeFileId: fileId
        };
        return { lessons: updatedLessons };
    }),
    renameFile: (lessonId, fileId, newName) => set((state) => {

        if ([".py",".txt"].every(ext => !newName.endsWith(ext))) {
            alert("Only .py, and .txt files are allowed.");
            return state;
        }

        const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (lessonIndex === -1) return state; // Lesson not found

        const updatedLessons = [...state.lessons];
        const fileIndex = updatedLessons[lessonIndex].files.findIndex(file => file.id === fileId);
        if (fileIndex === -1) return state; // File not found

        const updatedFiles = [...updatedLessons[lessonIndex].files];

        updatedFiles[fileIndex] = {
            ...updatedFiles[fileIndex],
            name: newName
        }

        updatedLessons[lessonIndex] = {
            ...updatedLessons[lessonIndex],
            files: updatedFiles
        };

        return { lessons: updatedLessons };
    })
}), {
    name: 'lesson-storage', // name of the item in storage
}))