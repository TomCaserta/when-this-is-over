import { User, IUserModel } from '~/components/user/user.model';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from 'config';

export default class UserController {

  /**
   * Logs in a user with their email and password.
   */
  static login = async (req: Request, res: Response) => {
    const secret = config.get('auth.secret') as string;
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: 'missing_credentials' });
    }

    let user: IUserModel;

    try {
      user = await User.findOne({ email }).exec() as IUserModel;
    } catch (error) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    const token = jwt.sign({ id: user._id, email }, secret, {
      expiresIn: config.get('auth.expire')
    });

    return res.json({ token });
  }

}
