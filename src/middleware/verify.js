import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		jwt.verify(token, process.env.JWT_KY, (err, data) => {
			if (err) {
				return res.status(403).json({ message: 'Token wrong ', error: err });
			}
			req.user = data.currentUser;
			next();
		});
	} catch (error) {
		console.log(error.message);
	}
};
