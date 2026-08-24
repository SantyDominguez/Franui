import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/35 p-5 backdrop-blur-sm" role="presentation">
      <section
        className="w-full max-w-md rounded-[2rem] border border-white/70 bg-surface p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="font-display text-2xl text-ink">
            {title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
            <X aria-hidden="true" size={20} />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
