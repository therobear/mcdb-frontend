import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
    callback: Function;
    buttonType: string;
    actionType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: any;
    children: ReactNode;
};

const Button = ({
    callback,
    buttonType = 'standard',
    actionType = 'button',
    disabled,
    children,
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
        <button
            type={actionType}
            disabled={disabled}
            className={`${setButtonClass()}`}
            onClick={() => callback()}
        >
            {children}
        </button>
    );
};

export default Button;
