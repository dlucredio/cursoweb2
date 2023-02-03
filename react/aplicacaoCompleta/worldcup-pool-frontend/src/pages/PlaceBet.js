import { NavBar } from "../components/NavBar";

function PlaceBet() {
    return (
        <div className="h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className=" flex-1 flex flex-col items-center m-2">
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para fazer um palpite, digite seu e-mail</div>
                    <input className="flex-1 text-center p-2 mt-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white" type="text" />
                    <button className="rounded p-2 ml-2 mt-2 bg-blue-700 hover:bg-blue-900 text-white">Pesquisar</button>
                </div>

                <div className="flex flex-row flex-wrap items-center bg-amber-200 dark:bg-amber-900 dark:text-white text-center rounded p-2 mt-2 w-full max-w-lg">
                    <div className="flex-1 text-sm">
                        Já existe um palpite feito em 20/12/2023
                    </div>
                    <button className="rounded p-2 bg-green-700 hover:bg-green-900 text-white">Refazer</button>
                </div>
                <div className="flex flex-row flex-wrap items-center bg-green-200 dark:bg-green-900 dark:text-white text-center rounded p-2 mt-2 w-full max-w-lg">
                    <div className="flex-1 text-sm">
                        Nenhum palpite encontrado. Digite os dados pessoais e pressione o botão no final.
                    </div>
                </div>

                <div className="flex flex-col text-sm w-full max-w-lg">
                    <div className="flex flex-col">
                        <label htmlFor="gamblerName" className="mt-2 dark:text-white">Nome:</label>
                        <input id="gamblerName" type="text" className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm w-full max-w-lg">
                    <div className="flex flex-col">
                        <label htmlFor="gamblerPhone" className="mt-2 dark:text-white">Telefone:</label>
                        <input id="gamblerPhone" type="text" className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white sm:w-60" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gamblerBirthDate" className="mt-2 dark:text-white">Data de nascimento:</label>
                        <input id="gamblerBirthDate" type="date" className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white sm:w-60" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm w-full max-w-lg">
                    <div className="flex flex-col">
                        <label htmlFor="betChampion" className="mt-2 dark:text-white">Campeão:</label>
                        <input id="betChampion" type="text" className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white sm:w-60" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="betRunnerUp" className="mt-2 dark:text-white">Vice-campeão:</label>
                        <input id="betRunnerUp" type="text" className="p-2 rounded bg-gray-200 dark:bg-slate-800 dark:text-white sm:w-60" />
                    </div>
                </div>

                <button className="rounded p-2 mt-6 mb-6 bg-green-700 hover:bg-green-900 text-white">Gravar palpite</button>
            </div>
        </div >
    );
}

export default PlaceBet;