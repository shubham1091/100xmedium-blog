import { ChangeEvent } from "react";

interface LabelInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value?: string;
}

function LabelInput({
    label,
    placeholder,
    onChange,
    type,
    value,
}: LabelInputType) {
    return (
        <div className=" my-2">
            <label className="block mb-2 text-sm font-medium text-black">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                value={value}
                className=" border border-gray-300 text-gray-500 text-md rounded-lg  block w-[18rem] p-2.5 "
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default LabelInput;
