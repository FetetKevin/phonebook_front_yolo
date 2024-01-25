const Form = ({
    handleSubmit,
    handleChangeInput,
    setName,
    setNumber,
    name,
    number,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:{" "}
                <input
                    value={name}
                    onChange={(e) => handleChangeInput(e, setName)}
                />
                <br />
                number:
                <input
                    value={number}
                    onChange={(e) => handleChangeInput(e, setNumber)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default Form;
