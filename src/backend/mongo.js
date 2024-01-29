import mongoose from "mongoose";
import process from "process";

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://HonkHonk:${password}@cluster0.aky9tjd.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Persons", personSchema);

const person = new Person({
    name,
    number,
});

if (process.argv.length === 5) {
    person.save().then(() => {
        console.log(
            `added ${process.argv[3]} - ${process.argv[4]} to phonebook database.`
        );
        mongoose.connection.close();
    });
}

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
