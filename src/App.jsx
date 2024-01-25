import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Display from "./components/Display";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [filter, setFilter] = useState("");

    const baseUrl = "http://localhost:3001/api";

    useEffect(() => {
        axios.get(baseUrl + "/persons").then((res) => setPersons(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingPerson = persons.find((person) => person.name === name);

        if (existingPerson) {
            const ask = window.confirm(
                `${name} was already added to the phonebook. Replace the number?`
            );

            if (ask) {
                const updatedPerson = {
                    id: existingPerson.id,
                    name: existingPerson.name,
                    number: number,
                };

                axios
                    .put(
                        `${baseUrl}/persons/${existingPerson.id}`,
                        updatedPerson
                    )
                    .then((response) =>
                        setPersons((prevPersons) =>
                            prevPersons.map((person) =>
                                person.id === existingPerson.id
                                    ? response.data
                                    : person
                            )
                        )
                    );

                setName("");
                setNumber("");
                return;
            }
        }

        const personObj = {
            name,
            number: number,
        };

        axios.post(`${baseUrl}/persons`, personObj).then((response) => {
            setPersons(response.data);
            setName("");
            setNumber("");
        });
    };

    const handleChangeInput = (e, setter) => {
        setter(e.target.value);
    };

    const deleteUser = (id) => {
        const user = persons.find((person) => person.id === id);

        if (!user) {
            return console.log("user not found");
        }

        const restUsers = persons.filter((person) => person.id !== id);

        axios.delete(baseUrl + "/persons/" + id).then(setPersons(restUsers));
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <h4>filter:</h4>
            <Filter
                handleChangeInput={handleChangeInput}
                setFilter={setFilter}
            />
            <h2>Add a new user:</h2>
            <Form
                handleSubmit={handleSubmit}
                handleChangeInput={handleChangeInput}
                setName={setName}
                setNumber={setNumber}
                name={name}
                number={number}
            />
            <h2>Numbers</h2>
            <Display
                persons={persons}
                filter={filter}
                deleteUser={deleteUser}
            />
        </div>
    );
};

export default App;
