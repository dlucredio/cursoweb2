import express from 'express';
import { createGambler, updateGambler, retrieveGamblerByEmail } from '../persistence/gamblerPersistence.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedGambler = await updateGambler(req.body);
            return res.json(updatedGambler);

        } else {
            const newGambler = await createGambler(req.body);
            return res.json(newGambler);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating/updating gambler');
    }
});

router.get('/', async (req, res) => {
    try {
        const gambler = await retrieveGamblerByEmail(req.query.email);
        if (gambler) {
            return res.json(gambler);
        } else {
            res.status(404).send('Gambler does not exist');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving gambler');
    }
})

export default router;