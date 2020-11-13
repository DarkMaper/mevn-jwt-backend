import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (info) {
			return res.status(401).json({ error: info.message });
		}
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (!user) {
			return res.status(403).json({ error: 'Access denied' });
		}

		req.user = user;
		next();
	})(req, res, next);
}
