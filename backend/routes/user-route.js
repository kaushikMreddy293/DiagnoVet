import express from 'express'
import * as userController from '../controllers/user-controller.js'

const router = express.Router();


//Creating routes of working with user

router.route('/create')
.post(userController.saveUser);

router.route('/fetchAll')
.get(userController.getAllUsers);

router.route('/fetch/:id')
.get(userController.getUserbyID);

router.route('/update/:id')
.put(userController.updateUser);

router.route('/delete/:id')
.delete(userController.deleteUser);

router.route('/usertest').get((req, res) => res.send('User Testing'));


export default router;