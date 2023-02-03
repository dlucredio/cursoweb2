import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg-white dark:bg-slate-900 w-full h-full flex flex-col justify-center items-center">
            <div className="bg-gray-300 dark:bg-slate-800 flex flex-col justify-center items-center w-full h-full md:w-fit md:h-fit md:p-16 md:rounded-3xl">
            <div className="text-blue-800 dark:text-blue-400 text-center pb-12 text-2xl font-black uppercase">Bolão da copa</div>
            <div className="flex flex-col justify-center items-stretch">
                <Link to="/placeBet" className="bg-green-700 m-4 py-2 px-5 rounded-full text-white text-center hover:bg-green-900">Palpitar</Link>
                <Link to="/viewBets" className="bg-green-700 m-4 py-2 px-5 rounded-full text-white text-center hover:bg-green-900">Ver</Link>
            </div>
            </div>
        </div>
    );
}

export default Home;