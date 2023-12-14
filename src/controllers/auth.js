import Users from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getByIdUser = async (req, res) => {
	try {
		const user = await Users.findById(req.params.id);
		if (!user) {
			return res.status(403).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'Get By Id successfully', data: user });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
// Creat a new User
export const regesterUser = async (req, res) => {
	try {
		const currentUser = await Users.findOne({
			email: req.body.email,
		});
		if (currentUser) {
			return res.status(403).json({ message: 'User already exists' });
		}
		//Password Hashing
		const hashingPassword = bcrypt.hash(req.body.password, 10);

		// Check Email
		// const emailRegexp =
		// 	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		// if (!emailRegexp.test(req.body.email)) {
		// 	res.status(401).json({ message: 'Invalid email address' });
		// }

		const newUser = new Users({
			fullName: req.body.fullName,
			img: req.body.img,
			password: hashingPassword,
			email: req.body.email,
		});
		await newUser.save();
		res
			.status(201)
			.json({ message: 'User created successfully', data: newUser });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const currentUser = await Users.findOne({
			email: email,
		});
		if (!currentUser) {
			return res.status(403).json({ message: 'Email or password wrong' });
		}
		const currentPassword = bcrypt.compare(currentUser.password, password);
		if (!currentPassword) {
			return res.status(403).json({ message: 'Email or password wrong' });
		}

		const token = jwt.sign({ currentUser }, process.env.JWT_KY, {
			expiresIn: '3d',
		});

		res.status(200).json({ token: token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logoutUser = async (req, res) => {};

export const updateUser = async (req, res) => {
	try {
		await Users.findByIdAndUpdate(
			req.params.userId,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		res.status(200).json({ message: 'User updated successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		await Users.findByIdAndDelete(req.params.userId);
		res.status(200).json({ message: 'User deleted successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
