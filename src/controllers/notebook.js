import Notebooks from '../models/noteboock.model.js';

export const getById = async (req, res) => {
	try {
		const notebook = await Notebooks.findById(req.params.id).populate(
			'userId',
			'fullName email password'
		);
		if (!notebook) {
			return res
				.status(404)
				.json({ message: 'Notebook not found', data: false });
		}
		res.status(200).json({ message: 'Get By Id successfully', data: notebook });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
// Creat a new User

export const addNotebook = async (req, res) => {
	try {
		const newNotebook = new Notebooks({
			title: req.body.title,
			img: req.body.img,
			price: req.body.price,
			descr: req.body.descr,
			userId: req.user._id,
		});
		await newNotebook.save();
		res
			.status(201)
			.json({ message: 'User created successfully', data: newNotebook });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const updateNotebook = async (req, res) => {
	try {
		await Notebooks.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Updated notebook successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const deleteNotebook = async (res, req) => {
	try {
		await Notebooks.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: 'Deleted notebook successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
