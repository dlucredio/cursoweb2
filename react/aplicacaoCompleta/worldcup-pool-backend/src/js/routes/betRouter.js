import express from 'express';
import { createBet, updateBet, retrieveBetsAndGamblers, retrieveBetsByGamblerId } from '../persistence/betPersistence.js';

const router = express.Router();

// Save or update a bet.
// If an id is provided, bet is updated (id and gambler_id will not be updated).
// If no id is provided, bet is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedBet = await updateBet(req.body);
            return res.json(updatedBet);
        } else {
            const newBet = await createBet(req.body);
            return res.json(newBet);
        }
    } catch (err) {
        if (err.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Gambler ' + req.body.gambler_id + ' does not exist');
        } else {
            console.log(err);
            res.status(500).send('Error creating bet');
        }
    }
});

// Retrieve a gambler by gambler_id (provided via query param)
router.get('/', async (req, res) => {
    try {
        if (req.query.gambler_id) {
            const bets = await retrieveBetsByGamblerId(req.query.gambler_id);
            return res.json(bets);
        } else {
            const allBets = await retrieveBetsAndGamblers();
            return res.json(allBets);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving bets');
    }
});


export default router;