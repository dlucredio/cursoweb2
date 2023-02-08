export function FormInput({ id, value, label, type, size, onChange }) {

    let sizeClass = null;
    if (size === 'full') {
        sizeClass = '';
    } else if (size === 'half') {
        sizeClass = 'sm:w-[48%]';
    } else {
        throw 'size must be full or half';
    }

    const outerDivClasses = "flex flex-col text-sm w-full "+sizeClass;

    return <div className={outerDivClasses}>
        <label htmlFor={id} className="mt-2 dark:text-white">{label}</label>
        <input value={value} onChange={onChange} id={id} type={type} className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white" />
    </div>;
}