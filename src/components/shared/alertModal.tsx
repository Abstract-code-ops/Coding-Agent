import { useRef, useEffect } from "react";
import { AlertTriangle, XCircle, X } from "lucide-react";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: "error" | "warning";
}

export default function AlertModal({ isOpen, onClose, title, message, variant = "error" }: AlertModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const styles = {
    error: {
      icon: <XCircle className="text-white" size={24} />,
      border: "border-none",
      bg: "bg-red-500",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icon: <AlertTriangle className="text-white" size={24} />,
      border: "border-amber-200",
      bg: "bg-amber-600",
      button: "bg-amber-600 hover:bg-amber-700",
    },
  }[variant];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="
        fixed top-16 left-1/2 -translate-x-1/2
        m-0 p-0 rounded-xl border-none shadow-2xl overflow-hidden
        w-[90%] max-w-sm bg-white
        open:animate-bounce-in
        backdrop:bg-black/40 backdrop:backdrop-blur-sm
      "
    >
      <div className={`p-4 flex items-start gap-3 ${styles.bg} border-b ${styles.border}`}>
        {styles.icon}
        <div className="flex-1">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-white mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-3 flex justify-end bg-[#21252b]">
        <Button 
          onClick={onClose}
          className={`text-white px-6 ${styles.button}`}
        >
          Acknowledge
        </Button>
      </div>
    </dialog>
  );
}