import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose.connect(url);
// .then(() => {
//     console.log("connected to MONGODB");
// })
// .catch((error) => {
//     console.log("error to connect to MONGODB:", error.message);
// });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model("Persons", personSchema);
