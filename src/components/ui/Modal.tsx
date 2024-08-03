import { useState } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
    image: string;
    onClose: Function;
};

const Modal = ({ image, onClose }: ModalProps) => {
    return (
        <div
            className="row modal-background view-page-img-hover"
            onClick={() => onClose()}
        >
            <img src={`${image}`} />
        </div>
    );
};

export default Modal;
