// components/GlobalAlert.tsx
"use client"
import { useLessonStore } from "@/lib/store/useLessonStore";
import AlertModal from "./alertModal";

export default function GlobalAlert() {
  const error = useLessonStore((state) => state.error);
  const clearError = useLessonStore((state) => state.clearError);

  return (
    <AlertModal
      isOpen={!!error}
      onClose={clearError}
      title={error?.title || ""}
      message={error?.message || ""}
      variant={error?.variant || "error"}
    />
  );
}