import React, { useState } from 'react';

function NameForm() {
    const [name, setName] = useState('');

    const handleChange = (event) => {
        alert(`Calling handler: ${event.target.value}`);
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Hello, ${name}!`);
    };

    return (
        <form id="nameForm" onSubmit={handleSubmit}>
            <label htmlFor="nameInput">Enter your name: </label>
            
            <input
            id="nameInput"
            type="text"
            value={name}
            onChange={handleChange}
            />

            <button id="submitButton" type="submit">
            Submit
            </button>
        </form>
    );
}

export default NameForm;