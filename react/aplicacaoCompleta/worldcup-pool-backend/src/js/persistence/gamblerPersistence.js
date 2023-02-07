import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_GAMBLER =
    `INSERT INTO gambler(id,name,email,phone,birth_date)
                 VALUES (UUID_TO_BIN(?),?,?,?,?)`;

const UPDATE_GAMBLER =
    `UPDATE gambler set name=?,phone=?,birth_date=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_GAMBLER_BY_ID =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,DATE_FORMAT(birth_date,'%Y-%m-%d') as birth_date
            FROM gambler
            WHERE id=UUID_TO_BIN(?)`;

const SELECT_GAMBLER_BY_EMAIL =
    `SELECT BIN_TO_UUID(id) as id,name,email,phone,DATE_FORMAT(birth_date,'%Y-%m-%d') as birth_date
            FROM gambler
            WHERE email=?`;

export async function retrieveGamblerById(id) {
    try {
        const [rows] = await getPool().execute(SELECT_GAMBLER_BY_ID, [id]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving gambler by id: ' + id,
            err);
    }
}

export async function retrieveGamblerByEmail(email) {
    try {
        const [rows] = await getPool().execute(SELECT_GAMBLER_BY_EMAIL, [email]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving gambler by email: ' + email,
            err);
    }
}

export async function createGambler(gambler) {
    if (await retrieveGamblerByEmail(gambler.email)) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Gambler email already exists: ' + gambler.email,
            null);
    }
    try {
        gambler.id = uuidv4();
        await getPool().execute(INSERT_GAMBLER,
            [
                gambler.id,
                gambler.name,
                gambler.email,
                gambler.phone,
                gambler.birth_date
            ]);
        return gambler;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating gambler: ' + gambler.email,
            err);
    }
}

export async function updateGambler(gambler) {
    try {
        await getPool().execute(UPDATE_GAMBLER,
            [
                gambler.name,
                gambler.phone,
                gambler.birth_date,
                gambler.id,
            ]);
        return gambler;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating gambler: ' + gambler.id,
            err);
    }
}