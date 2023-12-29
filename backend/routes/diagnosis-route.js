import express from 'express'
import * as diagnosisController from '../controllers/diagnosis-controller.js';

const router = express.Router();

//Creating routes of working with diagnosis

router.route('/create')
.post(diagnosisController.save);

router.route('/fetchAll')
.get(diagnosisController.getAll);

router.route('/fetch/:id')
.get(diagnosisController.getById);

router.route('/update/:id')
.put(diagnosisController.update);

router.route('/delete/:id')
.delete(diagnosisController.remove);

router.route('/ddxtest').get((req, res) => res.send('DDX Testing'));


export default router;

