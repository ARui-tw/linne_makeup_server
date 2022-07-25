import express from 'express';
import controller from '../controller';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/login', controller.user.login);

userRouter.post('/modifyUser', controller.user.modifyUser);
userRouter.post('/modifyCurrentUser', controller.user.modifyCurrentUser);

userRouter.post('/getUser', controller.user.getUser);
userRouter.post('/getCurrentUser', controller.user.getCurrentUser);
userRouter.post('/getUsers', controller.user.getUsers);

userRouter.post('/removeUser', controller.user.removeUser);

export default userRouter;
