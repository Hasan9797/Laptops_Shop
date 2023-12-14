import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		fullName: { type: 'string', required: true },

		img: { type: 'string', required: true },

		password: { type: 'string', required: true, lowercase: true }, // sdasdsa@google.com

		email: {
			type: 'string',
			required: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
			lowercase: true,
		}, // sDaSdsa@google.com / sdasdsa@google.com

		cart: {
			items: [
				{
					count: { type: 'number', required: true },
					noteboock: {
						type: Schema.Types.ObjectId,
						ref: 'Noteboocks',
						required: true,
					},
				},
			],
		},
	},
	{ timestamps: true }
);

export default model('Users', userSchema);
