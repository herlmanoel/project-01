import './style.css';

export const Input = ({ valueInput, handleChange }) => {
    return (
        <input
            className="textInput"
            onChange={handleChange}
            value={valueInput}
            type="search"
            placeholder="Type your search"
        />
    );
}