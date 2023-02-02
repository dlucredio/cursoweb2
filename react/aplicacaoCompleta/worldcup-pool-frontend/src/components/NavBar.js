import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export function NavBar() {
    const [floatMenuShown, setFloatMenuShown] = useState(false);

    function toggleFloatMenuShown() {
        setFloatMenuShown(!floatMenuShown);
    }

    return (
        <div className="w-full bg-gray-300 text-white flex flex-row p-3 justify-between items-center">
            <Link to="/" className="text-blue-800 text-center text-2xl font-black uppercase select-none">Bolão da copa</Link>
            <div className="cursor-pointer">
                <MdMenu onClick={toggleFloatMenuShown} className="text-2xl md:hidden text-green-700 hover:text-green-900 select-none" />
                <div className="relative">
                    <div className={`absolute right-0 top-0 flex md:hidden flex-col items-center bg-gray-300  border-solid border-2 border-whitse rounded-xl p-4 drop-shadow transition-all duration-500 ${floatMenuShown ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                        <Link to="/placeBet" className="text-green-700 hover:text-green-900 mb-4 select-none">Palpitar</Link>
                        <Link to="/viewBets" className="text-green-700 hover:text-green-900 select-none">Ver</Link>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center">
                <Link to="/placeBet" className="text-green-700 hover:text-green-900 mr-10 select-none">Palpitar</Link>
                <Link to="/viewBets" className="text-green-700 hover:text-green-900 select-none">Ver</Link>
            </div>
        </div>
    );
}