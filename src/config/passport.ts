import { Request } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-jwt';
import User from '../models/User';

const jwtExtractor = function (req: Request) {
	let token = null;
	if (req && 'token' in req.cookies) {
		try {
			token = req.cookies.token.replace('Bearer ', '').replace(' ', '');
		} catch (error) {
			token = null;
		}
	}
	return token;
};

const opts = {
	jwtFromRequest: jwtExtractor,
	secretOrKey: process.env.JWT_SECRET || 'secret',
};

passport.use(
	new Strategy(opts, async (payload, done) => {
		try {
			const user = await User.findOne({ _id: payload.id });

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		} catch (error) {
			done(error);
		}
	}),
);
