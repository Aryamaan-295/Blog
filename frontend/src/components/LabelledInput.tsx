import { ChangeEvent } from "react";

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({ label, placeholder, type="text", onChange }: LabelledInputType) {
    return (
        <div>
            <label htmlFor={ label } className="block my-2 text-sm font-semibold text-gray-900 pt-2">
                { label }
            </label>
            <input type={ type } onChange={ onChange } id={ label } placeholder={ placeholder } required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5" />
        </div>
    )
}