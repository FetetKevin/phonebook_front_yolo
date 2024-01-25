const Filter = ({ handleChangeInput, setFilter }) => {
    return (
        <input type="text" onChange={(e) => handleChangeInput(e, setFilter)} />
    );
};

export default Filter;
