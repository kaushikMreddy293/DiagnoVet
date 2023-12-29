import express from 'express'
import * as drugController from '../controllers/drug-controller.js';

const router = express.Router();

//Creating routes of working with drugs

router.route('/create')
.post(drugController.save);

router.route('/fetchAll')
.get(drugController.getAll);

router.route('/fetch/:id')
.get(drugController.getById);

router.route('/update/:id')
.put(drugController.update);

router.route('/delete/:id')
.delete(drugController.remove);

router.route('/drugtest').get((req, res) => res.send('Drug Testing'));


export default router;

