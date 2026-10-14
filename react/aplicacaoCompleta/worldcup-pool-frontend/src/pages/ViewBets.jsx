import { useEffect, useState } from "react";

import { NavBar } from "../components/NavBar";
import { formatDate } from "../utils/utils";

function ViewBets() {
    const [bets, setBets] = useState([]);
    useEffect(() => {
        async function fetchBets() {
            const response = await fetch('http://localhost:5000/bet');
            if (response.status === 200) {
                setBets(await response.json());
            }
        }
        fetchBets();
    }, []);

    const betRows = bets.map(e => <tr key={e.bet_id} className="border-t border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800">
        <td className="text-center p-2">{e.gambler_name}</td>
        <td className="text-center p-2">{e.champion}</td>
        <td className="text-center p-2">{e.runner_up}</td>
        <td className="text-center p-2">{formatDate(e.bet_date)}</td>
    </tr>);

    let text = bets.length + ' palpites até o momento';
    if (bets.length === 0) {
        text = 'Nenhum palpite feito';
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex flex-col items-center justify-center w-full sm:m-2 sm:max-w-lg">
                    <div className="p-2 dark:text-white my-2">{text}</div>

                    {bets.length > 0 &&
                        <table className="table-auto text-sm w-full bg-slate-200 dark:bg-slate-700 dark:text-white sm:rounded-xl overflow-hidden">
                            <thead>
                                <tr className="border-b-2 border-slate-300 dark:border-slate-500">
                                    <th className="text-center p-2">Palpiteiro</th>
                                    <th className="text-center p-2">Campeão</th>
                                    <th className="text-center p-2">Vice-campeão</th>
                                    <th className="text-center p-2">Data</th>
                                </tr>
                            </thead>
                            <tbody>{betRows}</tbody>
                        </table>}
                    <div className="m-2"></div>
                </div>
            </div>
        </div>
    );
}

export default ViewBets;