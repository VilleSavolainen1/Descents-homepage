import React from 'react';
import './style.css';


const FoldersTable = ({ folders, folderimage, setCurrentfolder }) => {


    const folderSwitch = (name) => {
        setCurrentfolder(name)
    }

    return (
        <div className="folderview">
            {folders.length > 0 ? folders.map(name => {
                return (
                        <ul key={name.id} className="list" onClick={() => folderSwitch(name.name)}>
                            <img className="folderimage" src={folderimage} alt=""></img> <li  className="foldernamelink" key={name.id} style={{cursor: 'pointer'}} >{name.name}</li>
                        </ul>
                )
            }) : null}
        </div>
    )
}

export default FoldersTable;