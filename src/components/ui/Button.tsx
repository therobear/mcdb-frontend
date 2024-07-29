import React from 'react';

type ButtonProps = {
    text: String;
    callback: Function;
    buttonType: String;
    displayIcon?: Boolean;
    icon?: String;
};

const Button = ({
    text,
    callback,
    buttonType = 'standard',
    displayIcon = false,
    icon = '',
}: ButtonProps) => {
    const setButtonClass = () => {
        switch (buttonType) {
            case 'standard':
                return 'button-standard';

            case 'warning':
                return 'button-warning';

            default:
                return 'button-standard';
        }
    };

    return (
        <button className={`${setButtonClass()}`} onClick={() => callback()}>
            {text}
        </button>
    );
};

export default Button;
