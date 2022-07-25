import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/login', controller.user.login);

userRouter.post('/modifyCurrentUser', authentication(), controller.user.modifyCurrentUser);
userRouter.post('/modifyUser', authentication('admin'), controller.user.modifyUser);

userRouter.post('/getCurrentUser', authentication(), controller.user.getCurrentUser);
userRouter.post('/getUser', authentication('admin'), controller.user.getUser);
userRouter.post('/getUsers', authentication('admin'), controller.user.getUsers);

userRouter.post('/removeUser', authentication('admin'), controller.user.removeUser);

export default userRouter;
