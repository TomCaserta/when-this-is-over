import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from 'config';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['X-AuthorizationToken'] as string;
    const secret = config.get('auth.secret') as string;
    
    let payload;

    try {
        payload = jwt.verify(token, secret) as any;
        res.locals.authPayload = payload;
    } catch (error) {
        return res.status(401).json({
            error: 'token.invalid'
        });
    }

    res.header('X-AuthorizationToken', jwt.sign(payload, secret, {
        expiresIn: config.get('auth.expire')
    }));

    next();
}
