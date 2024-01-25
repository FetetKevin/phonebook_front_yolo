import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

let persons = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

app.get("/", (req, res) => {
    res.send("<p>hi</p>");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = +req.params.id;
    const user = persons.find((user) => user.id === id);

    user
        ? res.json(user)
        : res.status(404).json({
              message: "User not found",
          });
});

app.get("/api/info", (req, res) => {
    res.send(
        `L'api phonebook contient ${
            persons.length
        } users.\n ${new Date().toLocaleString()}`
    );
});

app.delete("/api/persons/:id", (req, res) => {
    const id = +req.params.id;
    persons = persons.filter((person) => person.id !== id);

    res.status(204).end();
});

const generateId = () => {
    const maxId =
        persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
    return maxId + 1;
};

app.post("/api/persons", (req, res) => {
    const person = req.body;

    if (!person.name) {
        return res.status(400).json({
            error: "name missing",
        });
    }

    if (persons.find((p) => p.name === person.name)) {
        return res.status(400).json({
            message: "That name is already in use.",
        });
    }

    const format = {
        id: generateId(),
        name: person.name,
        number: person.number,
    };
    persons = persons.concat(format);
    res.send(persons);
});

app.put("/api/persons/:id", (req, res) => {
    const id = +req.params.id;

    const user = persons.find((user) => user.id === id);

    if (!user) {
        return res.json({
            message: "User not found",
        });
    }

    const updatedUser = {
        id: user.id,
        name: user.name,
        number: req.body.number,
    };

    persons = persons.map((person) =>
        person.id === id ? updatedUser : person
    );

    res.json(updatedUser);
});

const ressourceNotFound = (req, res) => {
    res.status(404).send({
        message: "Ressource not found, bad url.",
    });
};
app.use(ressourceNotFound);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
