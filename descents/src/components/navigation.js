import React from 'react';
import './style.css';

const Navigation = ({ setCurrentfolder, setLogged, exit, setUsername, setPassword }) => {

    const logout = () => {
        localStorage.clear();
        setLogged(false)
        setUsername('')
        setPassword('')
    };


    return (
        <div className="navigation">
            <div className="nav-wrapper">
                <nav id="nav">
                    <div className="nav-inner">
                        <div className="nav-links">
                            <span id="link" onClick={() => setCurrentfolder(null)}>Etusivu</span>
                        </div>
                        <div className="nav-right">
                            <span id="link" onClick={() => logout()}><img src={exit} alt="" style={{width: '25px'}} ></img></span>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation;