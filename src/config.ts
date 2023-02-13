import mongoose from "mongoose";


async function connect() {
    const uri = 'mongodb://localhost:27017/bookstore'

    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(uri)
        console.log("Database connected");
    } catch (error) {
        console.log("Could not connect to database");
        process.exit()
    }
}

export default connect