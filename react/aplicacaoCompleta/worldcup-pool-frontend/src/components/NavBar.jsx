import { Link } from "react-router";
import { useState } from "react";

export function NavBar() {
    const [floatMenuShown, setFloatMenuShown] = useState(false);

    function toggleFloatMenuShown() {
        setFloatMenuShown(!floatMenuShown);
    }

    return (
        <div className="w-full bg-gray-300 dark:bg-slate-800 text-white flex flex-row p-3 justify-between items-center">
            <Link to="/" className="text-blue-800 dark:text-blue-400 text-center text-base sm:text-2xl font-black uppercase select-none">Bolão da copa</Link>
            <div className="cursor-pointer sm:hidden">
                <span
                    onClick={toggleFloatMenuShown}
                    className="material-symbols-outlined text-2xl text-green-700 dark:text-green-400 dark:hover:text-green-200 hover:text-green-900 select-none">
                    menu
                </span>
                <div className="relative">
                    <div className={`absolute right-0 top-0 flex flex-col items-center bg-gray-300 dark:bg-slate-800 border-solid border-2 border-white dark:border-slate-600 rounded-xl p-4 drop-shadow transition-all duration-500 ${floatMenuShown ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                        <Link to="/placeBet" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mb-4 select-none">Palpitar</Link>
                        <Link to="/viewBets" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Ver</Link>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex items-center">
                <Link to="/placeBet" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Palpitar</Link>
                <Link to="/viewBets" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Ver</Link>
            </div>
        </div>
    );
}