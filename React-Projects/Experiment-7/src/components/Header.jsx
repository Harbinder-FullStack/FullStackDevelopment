function Header(props) {
    return (
        <header>
            <h1>Header Component: {props.content}</h1>
            {props.login ? <button>Logout</button> : <button>Login</button>}
        </header>    
    )
}

export default Header;