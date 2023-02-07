import { useState } from 'react';

import { Button } from "../components/Button";
import FormInput from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";

function PlaceBet() {
    const [gamblerEmail, setGamblerEmail] = useState('');
    const [gamblerName, setGamblerName] = useState('');
    const [gamblerPhone, setGamblerPhone] = useState('');
    const [gamblerBirthDate, setGamblerBirthDate] = useState('');
    const [betChampion, setBetChampion] = useState('');
    const [betRunnerUp, setBetRunnerUp] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [searchConcluded, setSearchConcluded] = useState(false);
    const [existingGambler, setExistingGambler] = useState(null);

    async function retrieveGamblerByEmail() {
        if (gamblerEmail.trim().length === 0) {
            setInvalidEmail(true);
            setSearchConcluded(true);
            return;
        } else {
            setInvalidEmail(false);
            setSearchConcluded(true);
            try {
                const response = await fetch('http://localhost:5000/gambler?email=' + gamblerEmail);
                if (response.status === 404) {
                    setExistingGambler(null);
                    setGamblerName('');
                    setGamblerPhone('');
                    setGamblerBirthDate('');
                } else {
                    const gambler = await response.json();
                    setExistingGambler(gambler);
                    setGamblerName(gambler.name);
                    setGamblerPhone(gambler.phone);
                    setGamblerBirthDate(gambler.birth_date);
                }
            }
            catch (err) {
                console.log('Error: ' + err);
            }
        }
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2">
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para fazer um palpite, digite seu e-mail</div>
                    <input onChange={e => setGamblerEmail(e.target.value)} className="flex-1 text-center p-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white max-w-full" type="text" />
                    <div className="m-1"></div>
                    <Button label='Pesquisar' action={retrieveGamblerByEmail} color='blue' />
                </div>
                <div className='m-2'></div>
                {searchConcluded && invalidEmail &&
                    <MessageBanner type='error' content='Digite um e-mail válido' />
                }
                {searchConcluded && !invalidEmail && <div>
                    {existingGambler !== null &&
                        <MessageBanner type='warning' content={(<div className="flex flex-row flex-wrap items-center w-full">
                            <div className="flex-1 ">
                                Já existe um palpite feito em 20/12/2023
                            </div>
                            <Button label='Refazer' action='#' color='green' />
                        </div>)} />
                    }
                    {existingGambler == null &&
                        <MessageBanner type='info' content='Nenhum palpite encontrado. Digite os dados pessoais e pressione o botão no final.' />
                    }

                    <div className='m-2'></div>

                    <div className='flex flex-row flex-wrap justify-between max-w-lg'>
                        <FormInput id='gamblerName' label='Nome' value={gamblerName} type='text' size='full' onChange={e => setGamblerName(e.target.value)} />
                        <FormInput id='gamblerPhone' label='Telefone' value={gamblerPhone} type='text' size='half' onChange={e => setGamblerPhone(e.target.value)}  />
                        <FormInput id='gamblerBirthDate' label='Data de nascimento' value={gamblerBirthDate} type='date' size='half' onChange={e => setGamblerBirthDate(e.target.value)} />
                        <FormInput id='betChampion' label='Campeão' type='text' size='half' onChange={e => setBetChampion(e.target.value)} />
                        <FormInput id='betRunnerUp' label='Vice-campeão' type='text' size='half' onChange={e => setBetRunnerUp(e.target.value)} />
                    </div>

                    <div className="m-2"></div>

                    <Button label='Gravar palpite' action='#' color='green' />
                </div>}
                <div className="m-2"></div>
            </div>
        </div >
    );
}

export default PlaceBet;