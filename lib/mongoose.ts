import mongoose from 'mongoose';

let isConnected = false; //test connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined')

    if (isConnected) return console.log('connected connection')

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log('Connected to MongoDB')
    }
    catch(error) {
        console.log(error)
    }
}