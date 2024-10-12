import { Dialog, DialogPanel } from "@headlessui/react";

import { FaTimes } from "react-icons/fa";
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
        <div className="flex min-h-full items-center justify-center bg-overlay60 p-8 ">
          <DialogPanel
            className={`data-[closed]:transform-[scale(95%)] relative max-w-[300px] rounded-xl bg-white p-6  backdrop-blur-2xl duration-500 ease-out data-[closed]:opacity-0 sm:max-w-[350px] ${className}`}
          >
            <button className=" absolute right-2 top-2 rounded-full  p-2" onClick={onClose}>
              <FaTimes fontSize={20} />
            </button>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
