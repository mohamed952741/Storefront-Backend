import { index, show, create, authenticate } from '../controllers/users';
import { Router } from 'express';

const users = Router();
users.get('/users', index);
users.get('/users/:id', show);
users.post('/users', create);
users.post('/users/authenticate', authenticate);
export default users;
