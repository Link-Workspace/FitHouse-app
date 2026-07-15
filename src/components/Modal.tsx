import type { ReactNode } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
};

export function Modal({ open, title, children, onClose, wide }: Props) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal-sheet ${wide ? 'modal-sheet--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Janela'}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-sheet__handle" />
        <header className="modal-sheet__header">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </header>
        <div className="modal-sheet__content">{children}</div>
      </section>
    </div>
  );
}
