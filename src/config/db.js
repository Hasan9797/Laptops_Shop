import mongoose from 'mongoose';

export const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
		});
		console.log('Database connection successful'.blue);
	} catch (error) {
		console.log(error.message);
	}
};

// export default connectDb;
