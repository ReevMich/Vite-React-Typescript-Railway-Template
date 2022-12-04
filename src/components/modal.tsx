import { Component, createEffect, createSignal, ParentComponent, Show } from "solid-js";
import { Motion, Presence } from "@motionone/solid"
import { MotionEvent } from "@motionone/dom";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Modal: ParentComponent<ModalProps> = (props) => {
    const [isClosing, setIsClosing] = createSignal(false);
    let modalWindow: HTMLDivElement | undefined;
    
    createEffect(() => {
        if (props.isOpen) {
            disableBodyScroll(modalWindow);
        } else {
            enableBodyScroll(modalWindow);
        }
    })

    const onMotionComplete = (e: MotionEvent) => {
        if (isClosing() && e.detail.target.opacity === 0) {
            setIsClosing(false);
            props.setIsOpen(false);
        }
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (!modalWindow.contains((e as any).target)) setIsClosing(true);
        else e.preventDefault();
    };

    return (
        <Show when={props.isOpen}>
            <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal={props.isOpen} onClick={handleOutsideClick}>
                {/* <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
  --> */}
                <Presence exitBeforeEnter>
                    <Show when={props.isOpen && !isClosing()}>
                        <Motion.div
                            class="fixed inset-0 bg-purple-700 bg-opacity-30 transition-opacity"
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, transition: { duration: 0.3 } }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        />
                    </Show>
                </Presence>

                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                        <span class="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">&#8203;</span>

                        {/* <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
                        <Presence exitBeforeEnter>
                            <Show when={props.isOpen && !isClosing()}>
                                <Motion.div
                                    ref={modalWindow}
                                    class="flex w-full text-left text-base md:my-8 md:max-w-xl md:px-4 lg:max-w-4xl xl:max-w-6xl"
                                    initial={{ opacity: 0, y: 16, scaleY: .95 }}
                                    animate={{ opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.3 } }}
                                    exit={{ opacity: 0, y: 16, scaleY: .95 }}
                                    onMotionComplete={onMotionComplete}>
                                    <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <button onClick={() => setIsClosing(true)} type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                                            <span class="sr-only">Close</span>
                                            {/* <!-- Heroicon name: outline/x-mark --> */}
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div class="mt-3 text-center sm:mt-5">
                                            {props.children}
                                        </div>
                                    </div>
                                </Motion.div>
                            </Show>
                        </Presence>
                    </div>
                </div>
            </div>
        </Show>
    )
};

export default Modal;