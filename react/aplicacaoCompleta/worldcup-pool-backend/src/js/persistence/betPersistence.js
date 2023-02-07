import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_BET =
    `INSERT INTO bet(id,champion,runner_up,gambler_id,bet_date)
                 VALUES (UUID_TO_BIN(?),?,?,UUID_TO_BIN(?),?)`;

const UPDATE_BET =
    `UPDATE bet set champion=?, runner_up=?, bet_date=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_BETS_BY_GAMBLER_ID =
    `SELECT BIN_TO_UUID(id) as id, champion, runner_up, DATE_FORMAT(bet_date,'%Y-%m-%d') as bet_date
            FROM bet
            WHERE gambler_id=UUID_TO_BIN(?)`;

const SELECT_BETS_AND_GAMBLERS =
    `SELECT BIN_TO_UUID(bet.id) as bet_id, gambler.name as gambler_name, bet.champion, bet.runner_up, DATE_FORMAT(bet.bet_date,'%Y-%m-%d') as bet_date
                FROM bet
                INNER JOIN gambler
                ON bet.gambler_id = gambler.id
                ORDER BY gambler_name ASC;`

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
            'Error creating bet for gambler: ' + bet.gambler_id,
            err);
    }
}

export async function updateBet(bet) {
    try {
        await getPool().execute(UPDATE_BET,
            [
                bet.champion,
                bet.runner_up,
                bet.bet_date,
                bet.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating bet: ' + bet.id,
            err);
    }
}

export async function retrieveBetsByGamblerId(gambler_id) {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_BY_GAMBLER_ID, [gambler_id]);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving bet by gambler id: ' + gambler_id,
            err);
    }
}

export async function retrieveBetsAndGamblers() {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_AND_GAMBLERS);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet: ' + bet.id,
            err);
    }
}