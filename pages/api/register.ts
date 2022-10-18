const jwt = require('jsonwebtoken');

import dbConnect from './utils/db.connect';
import UserModel from './utils/user.model';

import { getErrorMessage } from './utils/helper';

const signUp = async (req: any, res: any) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        // Check if there is already a user with provided email
        const checkEmail = await UserModel.findOne({
          email: req.body.email,
        });
        if (checkEmail) {
          throw new Error('You are already registered, please sign in');
        }

        // Saving new user
        const newUser = await UserModel.create({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
        });
        await newUser.save();

        // Signing token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(201).json({ status: 'success', token, data: newUser });
      } catch (error) {
        res.json({ status: 'error', message: getErrorMessage(error) });
      }
      break;
  }
};

export default signUp;
