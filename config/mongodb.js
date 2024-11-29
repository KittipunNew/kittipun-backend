import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB👽");
    });
    mongoose.connection.on("error", (err) => {
        console.log("Error in connecting to Database", err);
    });
    await mongoose.connect(process.env.MONGO_URL);
}

export default connectDB