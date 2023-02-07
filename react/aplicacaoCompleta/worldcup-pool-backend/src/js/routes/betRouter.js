import express from 'express';
import { createBet, retrieveBetsForDisplay } from '../persistence/betPersistence.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const newBet = await createBet(req.body);
        return res.json(newBet);
    } catch (err) {
        if(err.cause.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Gambler '+req.body.gambler_id+' does not exist');
        } else {
            console.log(err);
            res.status(500).send('Error creating bet');
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const allBets = await retrieveBetsForDisplay();
        return res.json(allBets);
    } catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving bets');
    }
});


export default router;