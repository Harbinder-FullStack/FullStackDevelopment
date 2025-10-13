function ClickButton() {
    const handleClick = () => {
        alert('Button Clicked!');
    };
    const handleClickAgain = (name) => {
        alert(`Button Clicked! ${name}`);
    };

    return (
        <div id="clickButtonContainer">
            <button id="clickMeButton" onClick={handleClick}>
                Click Me
            </button>
            <button id="clickMeButton" onClick={() => handleClickAgain('Sulaksh')}>
                Click Me Again
            </button>
        </div>
    );
}

export default ClickButton;