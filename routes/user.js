import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/login', controller.user.login);

userRouter.post('/modifyCurrentUser', authentication(), controller.user.modifyCurrentUser);
userRouter.post('/modifyUser', authentication('admin'), controller.user.modifyUser);

userRouter.post('/getCurrentUser', authentication(), controller.user.getCurrentUser);

// FIXME: this is very unsafe, any who get an user_id can search for his personal data.
// should be fix
userRouter.post('/getUser', authentication('', false), controller.user.getUser);

userRouter.post('/getUsers', authentication('admin'), controller.user.getUsers);

userRouter.post('/removeUser', authentication('admin'), controller.user.removeUser);
userRouter.post('/email', authentication('', false), controller.user.email);

export default userRouter;
