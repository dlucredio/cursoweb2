import { Link } from "react-router-dom";

export function Button({label, color, link, action}) {
    let buttonColorClasses = ''
    if(color === 'green') {
        buttonColorClasses = 'bg-green-700 hover:bg-green-900 text-white';
    } else if(color === 'blue') {
        buttonColorClasses = 'bg-blue-700 hover:bg-blue-900 text-white';
    } else {
        throw 'Button must have either blue or green color';
    }

    const buttonClasses = buttonColorClasses + ' p-3 rounded-2xl text-center';

    if(link) {
        return <Link to={link} className={buttonClasses}>{label}</Link>
    } else if(action) {
        return <button onClick={action} className={buttonClasses}>{label}</button>
    } else {
        throw 'Button must have either link or action property defined';
    }
}