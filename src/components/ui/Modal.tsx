import { ReactNode } from 'react';

type ModalProps = {
    children: ReactNode;
    onClose: Function;
    allowCloseOnClick?: boolean;
};

const Modal = ({ children, onClose, allowCloseOnClick = true }: ModalProps) => {
    const setPointerClass = () => {
        switch (allowCloseOnClick) {
            case true:
                return 'modal-allow-close';

            case false:
                return 'modal-no-close';
        }
    };

    return (
        <div
            className={`row modal-background ${setPointerClass()}`}
            onClick={() => {
                if (allowCloseOnClick) onClose();
            }}
        >
            {children}
        </div>
    );
};

export default Modal;
