import React, { useState } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
    element: React.ReactNode;
    onClose: Function;
};

const Modal = ({ element, onClose }: ModalProps) => {
    return (
        <div
            className="row modal-background view-page-img-hover"
            onClick={() => onClose()}
        >
            {element}
        </div>
    );
};

export default Modal;
