import React, {useState} from 'react';
import axios from 'axios';

const CreateFolder = ({foldercreated, setFoldercreated}) => {
    const [foldername, setFoldername] = useState('');
    const [error, setError] = useState('');


    const onInputChange = (e) => {
        e.preventDefault();
        setError('')
        setFoldername(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault();
        if(foldername.length === 0){
            setError('Nimi puuttuu!')
        }else{
            axios.post('/create-folder', {folder: foldername})
        .then(() => {
            setFoldername('');
            if(!foldercreated){
                setFoldercreated(true);
            }else{
                setFoldercreated(false);
            }
        })
        }
    }

    return (
        <div className="newFolder">
            <h3>Luo uusi kansio</h3>
            <form onSubmit={submit}>
                <input id="foldernameinput" type="text" name="foldername" placeholder="Kansion nimi" value={foldername} onChange={onInputChange} ></input>
                <input id="foldernamebutton" type="submit" value="Luo kansio"></input>
                <p className="error">{error}</p>
            </form>
        </div>
    )
}

export default CreateFolder;