const jwt = require('jsonwebtoken');
const { promisify } = require('util');

import dbConnect from './utils/db.connect';
import UserModel from './utils/user.model';
import { getErrorMessage } from './utils/helper';

const authHandler = async (req: any, res: any) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let token;
        // Getting token
        if (req.headers.auth && req.headers.auth.startsWith('Bearer')) {
          token = req.headers.auth.split(' ')[1];
        }
        if (!token) {
          const errMessage: any = 'You are not logged in';
          throw new Error(errMessage);
        }

        // Decoding user token
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET,
        );

        // Verification token
        const user = await UserModel.findById(decoded.id);

        // Check if user still exists
        if (!user) {
          const errMessage: any = 'User does not exist';
          throw new Error(errMessage);
        }

        res.status(200).json({ status: 'success', data: user });
      } catch (error) {
        res.json({ status: 'error', message: getErrorMessage(error) });
      }
      break;

    case 'POST':
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          throw new Error('No valid login or password!');
        }

        const user = await UserModel.findOne({ email: email }).select(
          '+password',
        );

        if (!user || !(await user.correctPassword(password, user.password))) {
          throw new Error('Incorrect email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(200).json({ status: 'success', token });
      } catch (error) {
        res.json({ status: 'error', message: getErrorMessage(error) });
      }
      break;
  }
};

export default authHandler;
