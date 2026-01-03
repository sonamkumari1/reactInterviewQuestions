import { useState } from "react";
import Modal from "./Modal";

export default function ModalApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Open Modal
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Modal Title</h2>
        <p className="text-gray-600">
          This is a reusable modal component.
        </p>
      </Modal>
    </div>
  );
}
