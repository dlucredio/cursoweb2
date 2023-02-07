import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_BET =
    `INSERT INTO bet(id,champion,runner_up,gambler_id,bet_date)
                 VALUES (UUID_TO_BIN(?),?,?,UUID_TO_BIN(?),?)`;

const SELECT_BETS_FOR_DISPLAY =
    `SELECT gambler.name as gambler_name, bet.champion, bet.runner_up, bet.bet_date
                FROM bet
                INNER JOIN gambler
                ON bet.gambler_id = gambler.id;`

export async function createBet(bet) {
    try {
        await getPool().execute(INSERT_BET,
            [
                uuidv4(),
                bet.champion,
                bet.runner_up,
                bet.gambler_id,
                bet.bet_date
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet: ' + bet.id,
            err);
    }
}

export async function retrieveBetsForDisplay() {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_FOR_DISPLAY);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet: ' + bet.id,
            err);
    }
}