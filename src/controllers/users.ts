import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../model/user';
import * as dotenv from 'dotenv';

type Token = {
  user: {
    id: number;
  };
};

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new UserStore();

export const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  const users = await store.index();
  res.json({ users, message: 'Successfully Retrieved Users from database' });
};
export const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decode = jwt.verify(token as string, TOKEN_SECRET as string) as Token;
    //Only access show user if it has same token has id as userId passed in params
    if (decode.user.id !== parseInt(req.params.id)) {
      return res.json('Access denied, invalid token');
    }
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
    const getUser = await store.show(parseInt(req.params.id));
    res.json(getUser);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const create = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
export const authenticate = async (req: Request, res: Response) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await store.authenticate(
      credentials.username,
      credentials.password
    );
    let token = jwt.sign({ user: user }, TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};