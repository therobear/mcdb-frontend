import { ChangeEventHandler } from 'react';

type CheckboxProps = {
    label: string;
    checked?: boolean;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ label, checked, name = '', onChange }: CheckboxProps) => {
    return (
        <div className="checkbox-container">
            <label>
                <input
                    className="checkbox-spacing"
                    type="checkbox"
                    checked={checked}
                    name={name}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
