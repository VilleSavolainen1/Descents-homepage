import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';




const FolderContents = ({ currentfolder, setCurrentfolder, files, filesloaded, fileUploaded, setFileuploaded, setFiledeleted, foldercreated, setFoldercreated, Progress }) => {

    const [showProgress, setShowProgress] = useState(false);

    let source = '/files/';

    function uploadFile(e) {
        e.preventDefault();
        const data = new FormData();
        if (e.target.file.files[0] === undefined) {
            return null;
        } else {
            setShowProgress(true)
            data.append("file", e.target.file.files[0])
            axios.post('/upload', data)
                .then(() => {
                    axios.post('/save-name', { file: e.target.file.files[0].name.toLowerCase(), folder: currentfolder })
                        .then(() => {
                            !fileUploaded ? setFileuploaded(true) : setFileuploaded(false);
                            setShowProgress(false)
                        })
                })
        }
    }

    function deleteFolder() {
        let filesCount = 0;
        if (files[0]) {
            files.map(f => {
                if (f.folder === currentfolder) {
                    return filesCount++;
                } else {
                    return null;
                }
            })
        }
        if (filesCount > 0) {
            alert("Kansion on oltava tyhjä!")
        }
        else {
            axios.post('/deletefolder', { folder: currentfolder })
                .then(res => {
                    foldercreated ? setFoldercreated(false) : setFoldercreated(true)
                    setCurrentfolder(null);
                })
        }
    }


    function deleteFile(filename, id) {
        let ask = window.confirm("Poistetaanko " + filename + "?");
        if (ask) {
            axios.post('/delete', { file: filename, id: id })
                .then(res => {
                    setFiledeleted(true)
                })
        }
    }




    const FileList = () => {
        if (filesloaded && files[0]) {
            return (
                files.map(f => {
                    if (f.folder === currentfolder) {
                        let ext = f.file.split(".")[1];
                        return (
                            <ul className="audiolist" key={f.id}>
                                <div className="audiotitle">
                                    <span className="audioinfo" ><i>{f.file}</i></span>
                                </div>
                                {ext === "wav" || ext === "mp3" || ext === "ogg" ?
                                    <li key={f.id} className="audiolist_list" >
                                        <AudioPlayer src={source + f.file} customAdditionalControls={[RHAP_UI.CURRENT_LEFT_TIME]} customProgressBarSection={[RHAP_UI.PROGRESS_BAR]} customVolumeControls={[]}
                                            style={{ width: '300px', background: 'transparent' }} layout="horizontal" />
                                    </li> : null
                                }
                                <div className="load_delete">
                                    <a href={`/download/${f.file}`}><button className="audiobutton">Lataa</button></a><button className="deletebutton" onClick={() => deleteFile(f.file, f.id)}>Poista</button>
                                </div>
                            </ul>
                        )
                    } else {
                        return null;
                    }
                })
            )
        }
    }



    return (
        <div>
            <div className="folderheader">
                <h1 style={{ color: '#fff', padding: 0, margin: 2 }} >{currentfolder}</h1>
                <button className="deletefolderbutton" onClick={() => deleteFolder()}>Poista kansio</button>
            </div>
            <div className="uploadform">
                <span style={{ fontWeight: 600, maginBottom: '60px' }} >Uusi tiedosto:</span>
                <form action="#" onSubmit={uploadFile} encType="multipart/form-data">
                    <input className="uploadform_form" type="file" name="file"></input>
                    <input className="form-submit" type="submit" value="Lähetä"></input>
                </form>
                {showProgress ? <img className="Progress" src={Progress} alt=""></img> : null}
            </div>
            <div className="filetable">
                <div className="filetable_audio">
                    {FileList()}
                </div>
            </div>
        </div>
    )
}

export default FolderContents