import { useState } from 'react';

import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';

function PlaceBet() {

    const [gamblerEmail, setGamblerEmail] = useState('');
    const [gamblerName, setGamblerName] = useState('');
    const [gamblerPhone, setGamblerPhone] = useState('');
    const [gamblerBirthDate, setGamblerBirthDate] = useState('');
    const [betChampion, setBetChampion] = useState('');
    const [betRunnerUp, setBetRunnerUp] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [searchConcluded, setSearchConcluded] = useState(false);
    const [message, setMessage] = useState('');
    const [existingGambler, setExistingGambler] = useState(null);
    const [existingBet, setExistingBet] = useState(null);

    function resetForm() {
        setGamblerEmail('');
        setGamblerName('');
        setGamblerPhone('');
        setGamblerBirthDate('');
        setBetChampion('');
        setBetRunnerUp('');
        setInvalidEmail(false);
        setSearchConcluded(false);
        setExistingGambler(null);
        setExistingBet(null);
    }

    async function retrieveGamblerByEmail() {
        if (gamblerEmail.trim().length === 0) {
            setInvalidEmail(true);
            setSearchConcluded(true);
            return;
        } else {
            setInvalidEmail(false);
            setSearchConcluded(true);
            try {
                const getGamblerResponse = await fetch('http://localhost:5000/gambler?email=' + gamblerEmail);
                if (getGamblerResponse.status === 200) {
                    const gambler = await getGamblerResponse.json();
                    const getBetResponse = await fetch('http://localhost:5000/bet?gambler_id=' + gambler.id);
                    if (getBetResponse.status === 200) {
                        const bets = await getBetResponse.json();
                        const bet = bets[0];
                        setExistingGambler(gambler);
                        setExistingBet(bet);
                        setGamblerName(gambler.name);
                        setGamblerPhone(gambler.phone);
                        setGamblerBirthDate(gambler.birth_date);
                        setBetChampion(bet.champion);
                        setBetRunnerUp(bet.runner_up);
                        return;
                    }
                }

                setExistingGambler(null);
                setExistingBet(null);
                setGamblerName('');
                setGamblerPhone('');
                setGamblerBirthDate('');
                setBetChampion('');
                setBetRunnerUp('');
            }
            catch (err) {
                console.log('Error: ' + err);
            }
        }
    }

    async function saveOrUpdateBet() {
        const gamblerRequestBody = {
            name: gamblerName,
            email: gamblerEmail,
            phone: gamblerPhone,
            birth_date: gamblerBirthDate
        };
        const betRequestBody = {
            champion: betChampion,
            runner_up: betRunnerUp,
            bet_date: new Date().toISOString().split('T')[0]
        }
        if (existingGambler !== null) {
            gamblerRequestBody.id = existingGambler.id;
        }
        if (existingBet !== null) {
            betRequestBody.id = existingBet.id;
        }
        const putGamblerResponse = await fetch('http://localhost:5000/gambler', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(gamblerRequestBody),
        });
        if (putGamblerResponse.status === 200) {
            const gambler = await putGamblerResponse.json();
            betRequestBody.gambler_id = gambler.id;
            const putBetResponse = await fetch('http://localhost:5000/bet', {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(betRequestBody),
            });
            if (putBetResponse.status === 200) {
                resetForm();
                setMessage('Seu palpite foi registrado');
                return;
            }
        }
        throw 'Error while saving/update bet/gambler. See server log for details.';
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2">
                {message &&
                    <MessageBanner type='info' content={message} />
                }
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para começar, digite seu e-mail</div>
                    <input onChange={e => setGamblerEmail(e.target.value)} value={gamblerEmail} className="flex-1 text-center p-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white max-w-full" type="text" />
                    <div className="m-1"></div>
                    <Button label='Pesquisar' action={retrieveGamblerByEmail} color='blue' />
                </div>
                <div className='m-2'></div>
                {searchConcluded && invalidEmail &&
                    <MessageBanner type='error' content='Digite um e-mail válido' />
                }
                {searchConcluded && !invalidEmail && <div>
                    {existingGambler !== null &&
                        <MessageBanner type='warning' content={`Já existe um palpite feito em ${formatDate(existingBet.bet_date)}. Se quiser substituir, modifique os valores e pressione o botão no final`} />
                    }
                    {existingGambler == null &&
                        <MessageBanner type='info' content='Nenhum palpite encontrado. Digite os dados a seguir e pressione o botão no final' />
                    }

                    <div className='m-2'></div>

                    <div className='flex flex-row flex-wrap justify-between max-w-lg'>
                        <FormInput id='gamblerName' label='Nome' value={gamblerName} type='text' size='full' onChange={e => setGamblerName(e.target.value)} />
                        <FormInput id='gamblerPhone' label='Telefone' value={gamblerPhone} type='text' size='half' onChange={e => setGamblerPhone(e.target.value)} />
                        <FormInput id='gamblerBirthDate' label='Data de nascimento' value={gamblerBirthDate} type='date' size='half' onChange={e => setGamblerBirthDate(e.target.value)} />
                        <FormInput id='betChampion' label='Campeão' type='text' size='half' value={betChampion} onChange={e => setBetChampion(e.target.value)} />
                        <FormInput id='betRunnerUp' label='Vice-campeão' type='text' size='half' value={betRunnerUp} onChange={e => setBetRunnerUp(e.target.value)} />
                    </div>

                    <div className="m-4"></div>

                    <div className="flex flex-col items-center">
                        {existingGambler !== null && <Button label='Substituir palpite' action={saveOrUpdateBet} color='green' />}
                        {existingGambler === null && <Button label='Gravar palpite' action={saveOrUpdateBet} color='green' />}
                    </div>
                </div>}
                <div className="m-2"></div>
            </div>
        </div >
    );
}

export default PlaceBet;