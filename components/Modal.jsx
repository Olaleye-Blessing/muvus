import { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ title, children, handleModalClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        let modal = modalRef.current;
        modal.classList.add("modal-show");
    }, []);

    return (
        <div className={`modal`} ref={modalRef}>
            <div className="modal__container">
                <div className="modal__content">
                    {title && (
                        <header className="modal__header">
                            <h3 className="modal__title">{title}'s trailer</h3>
                            <div className="modal__close">
                                <button
                                    className="modal__close-btn"
                                    onClick={handleModalClose}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                        </header>
                    )}
                    <section className="modal__main">
                        {/*  */}
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Modal;
