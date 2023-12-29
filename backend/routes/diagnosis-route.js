import express from 'express'
import * as diagnosisController from '../controllers/diagnosis-controller.js';

const router = express.Router();

//Creating routes of working with diagnosis

router.route('/create')
.post(diagnosisController.postDiagnosticReport);

router.route('/')
.get(diagnosisController.getAllDiagnosticReports);

router.route('/fetch/:id')
.get(diagnosisController.getDiagnosticReportByID);

router.route('/update/:id')
.put(diagnosisController.updateDiagnosticReport);

router.route('/delete/:id')
.delete(diagnosisController.deleteDiagnosticReport);

router.route('/test').get((req, res) => res.send('Testing'));


export default router;

