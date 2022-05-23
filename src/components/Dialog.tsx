import { Dialog as DialogHL, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<IDialogProps> = ({ children, isOpen, onClose }) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <DialogHL as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogHL.Panel className="w-full max-w-lg p-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-5 rounded-2xl">
                  {children}
                </DialogHL.Panel>
              </Transition.Child>
            </div>
          </div>
        </DialogHL>
      </Transition>
    </div>
  );
};

export default Dialog;
