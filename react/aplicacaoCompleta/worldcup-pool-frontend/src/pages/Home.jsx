import { Button } from "../components/Button";

function Home() {
    return (
        <div className="bg-white dark:bg-slate-900 w-full h-full min-h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-300 dark:bg-slate-800 flex flex-col justify-center items-center w-full h-full min-h-screen sm:w-fit sm:min-h-fit sm:p-16 sm:rounded-3xl">
                <div className="text-blue-800 dark:text-blue-400 text-center pb-12 text-2xl font-black uppercase">Bolão da copa</div>
                <div className="flex flex-col justify-center items-stretch">
                    <Button label="Palpitar" link="/placeBet" color='green' />
                    <div className="m-2"></div>
                    <Button label="Ver" link="/viewBets" color='green' />
                </div>
            </div>
        </div>
    );
}

export default Home;