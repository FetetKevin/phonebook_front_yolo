const Display = ({ persons, filter }) => {
    const filteredUsers = filter
        ? persons.filter((person) =>
              person.name.toLowerCase().startsWith(filter.toLowerCase())
          )
        : persons;

    const displayUsers = filteredUsers.map((person, index) => (
        <p key={person.name || index}>
            {person.name} - {person.number}
        </p>
    ));

    return (
        <div>
            {displayUsers.length > 0 ? displayUsers : <p>No match found.</p>}
        </div>
    );
};

export default Display;
