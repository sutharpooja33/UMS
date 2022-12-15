import { Router } from 'express';
import * as userController from '../controller/User.controller';

export default function () {
    const router = Router();
    console.log('router called..');

    router.get('/api/users', userController.getUsers);
    router.post('/api/login', userController.login);
    router.post('/api/user', userController.Registration);
    

    // router.get('/api/tutorials', userController.getTutorials)
    // router.post('/api/tutorials', userController.createTutorial)
    router.get('/api/user/:id', userController.getUserById)
    router.delete('/api/user/:id', userController.deleteUser)
    router.put('/api/user/:id', userController.updateUser)
    

    // router.delete('/api/tutorials', userController.deleteTutorials)


    return router;
}