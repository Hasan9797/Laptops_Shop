import { Schema, model } from 'mongoose';

const noteboockSchema = new Schema(
	{
		title: { type: 'string', required: true },

		img: { type: 'string', required: true },

		price: { type: 'number', required: true }, // sdasdsa@google.com

		descr: {
			type: 'string',
			required: true,
		},
		userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	},
	{ timestamps: true }
);

export default model('Notebooks', noteboockSchema);
