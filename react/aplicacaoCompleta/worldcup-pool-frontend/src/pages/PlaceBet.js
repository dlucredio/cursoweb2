import { Button } from "../components/Button";
import FormInput from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";

function PlaceBet() {
    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2">
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white">Para fazer um palpite, digite seu e-mail</div>
                    <input className="flex-1 text-center p-2 rounded bg-blue-200 dark:bg-blue-900 dark:text-white max-w-full" type="text" />
                    <div className="m-1"></div>
                    <Button label='Pesquisar' action='#' color='blue' />
                </div>
                <div className='m-2'></div>

                <MessageBanner type='warning' content={(<div className="flex flex-row flex-wrap items-center w-full">
                    <div className="flex-1 ">
                        Já existe um palpite feito em 20/12/2023
                    </div>
                    <Button label='Refazer' action='#' color='green' />
                </div>)} />
                <MessageBanner type='info' content='Nenhum palpite encontrado. Digite os dados pessoais e pressione o botão no final.' />

                <div className='m-2'></div>

                <div className='flex flex-row flex-wrap justify-between max-w-lg'>
                    <FormInput id='gamblerName' label='Nome' type='text' size='full' />
                    <FormInput id='gamblerPhone' label='Telefone' type='text' size='half' />
                    <FormInput id='gamblerBirthDate' label='Data de nascimento' size='half' />
                    <FormInput id='betChampion' label='Campeão' type='text' size='half' />
                    <FormInput id='betRunnerUp' label='Vice-campeão' type='text' size='half' />
                </div>

                <div className="m-2"></div>

                <Button label='Gravar palpite' action='#' color='green' />
                <div className="m-2"></div>
            </div>
        </div >
    );
}

export default PlaceBet;