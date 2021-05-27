import React from 'react';

const Login = ({ signIn, setUsername, setPassword, setError }) => {

    const usernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
        setError('')
    }

    const passwordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        setError('')
    }


    return (
        <div className="login">
            <form className="loginForm" onSubmit={signIn}>
                <input id="foldernameinput" type="text" name="username" placeholder="Käyttäjänimi" onChange={usernameChange}></input>
                <input id="foldernameinput" type="password" name="password" placeholder="Salasana" onChange={passwordChange} ></input>
                <input className="form-submit" type="submit" value="Kirjaudu" style={{height: '24px'}} ></input>
            </form>
        </div>
    )
}

export default Login;