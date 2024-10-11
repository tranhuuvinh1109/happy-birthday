import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};
const Modal = ({ children, className = "", isOpen, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="bg-overlay60 flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className={`data-[closed]:transform-[scale(95%)] w-full max-w-[300px] rounded-xl bg-white  p-6 backdrop-blur-2xl duration-500 ease-out data-[closed]:opacity-0 sm:max-w-full ${className}`}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
