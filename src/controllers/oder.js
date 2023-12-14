import Order from '../models/order.model.js';
import Notebooks from '../models/noteboock.model.js';

export const getById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			'userId',
			'fullName email password'
		);
		if (!order) {
			return res.status(404).json({ message: 'Order not found', data: false });
		}
		res.status(200).json({ message: 'Get By Id successfully', data: order });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const addOrder = async (req, res) => {
	try {
		const currentNoutboock = await Notebooks.findById(req.params.noutbookId);

		const currentOrder = await Order.findOne({
			userId: req.user._id,
			active: false,
		});
		//  Check noutboocks count and update
		if (currentOrder) {
			const filter = currentOrder.noutbooks.filter(
				ob => ob.noutbook._id.toString() === req.params.noutbookId.toString()
			);

			if (filter) {
				const newArray = currentOrder.noutbooks.map(ob => {
					if (ob.noutbook._id.toString() === req.params.noutbookId.toString()) {
						ob.count++;
					}
					return ob;
				});
				await Order.findByIdAndUpdate(
					currentOrder._id,
					{
						$set: { noutbooks: newArray },
					},
					{ new: true }
				);
				return res
					.status(201)
					.json({ message: 'User created successfully', data: newArray });
			}

			if (!filter) {
				await Order.findByIdAndUpdate(
					currentOrder._id,
					{
						$push: { noutbooks: { noutbook: currentNoutboock, count: 1 } },
					},
					{ new: true }
				);
				return res
					.status(201)
					.json({ message: 'User created successfully', data: newArray });
			}
		}
		const newOrder = new Order({
			noutbooks: [{ noutbook: currentNoutboock }],
			userId: req.user._id,
		});
		await newOrder.save();
		res
			.status(201)
			.json({ message: 'User created successfully', data: newOrder });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const updateOrder = async (req, res) => {
	try {
		await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		res.status(200).json({ message: 'Updated Order successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Deleted Order successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const sendOrder = async (req, res) => {
	try {
		await Order.findByIdAndUpdate(
			{ _id: req.params.orderId },
			{
				$set: {
					active: true,
				},
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ message: 'Add Order successfully', data: true });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const deletaNoutboockByOrder = async (req, res) => {
	const order = await Order.findOne({ userId: req.user._id });
	const filter = order.noutbooks.find(
		obj => obj.noutbook._id.toString() === req.params.noutbookId.toString()
	);

	if (filter.count > 0) {
		{
			console.log('-1');
			const newArray = order.noutbooks.map(obj => {
				if (obj.noutbook._id.toString() === req.params.noutbookId.toString()) {
					obj.count--;
				}
				return obj;
			});
			await Order.findByIdAndUpdate(
				{ _id: order._id },
				{
					$set: {
						noutbooks: newArray,
					},
				},
				{ new: true }
			);
			if (filter.count === 0) {
				const newArray = order.noutbooks.filter(
					obj =>
						obj.noutbook._id.toString() !== req.params.noutbookId.toString()
				);
				if (!newArray.length) {
					await Order.findByIdAndDelete(order._id);
					return res
						.status(200)
						.json({ message: 'Deleted Order successfully', data: true });
				}
				await Order.findByIdAndUpdate(
					{ _id: req.params.orderId },
					{
						$set: {
							noutbooks: newArray,
						},
					},
					{ new: true }
				);
			}
			return res.status(200).json({ message: 'Deleted successfully' });
		}
	}
	try {
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
