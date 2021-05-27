import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/login'
import Navigation from './components/navigation'
import CreateFolder from './components/createfolder'
import FoldersTable from './components/viewfolders';
import FolderContents from './components/foldercontents';
import axios from 'axios';
import folderimage from './Images/folder.png';
import exit from './Images/exit.png';
import Progress from './Images/progress.gif'


function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [folders, setFolders] = useState([]);
  const [foldercreated, setFoldercreated] = useState(false);
  const [currentfolder, setCurrentfolder] = useState(null);
  const [filesloaded, setFilesloaded] = useState(false);
  const [files, setFiles] = useState([])
  const [fileDeleted, setFiledeleted] = useState(false);
  const [fileUploaded, setFileuploaded] = useState(false);



  useEffect(() => {
    axios.get('/folders')
      .then(res => {
        setFolders(res.data)
      })
  }, [foldercreated])



  useEffect(() => {
    const loggeduser = window.localStorage.getItem('loggeduser')
    loggeduser ? setLogged(true) : setLogged(false)
  }, [])


  useEffect(() => {
    setFilesloaded(false)
    setFiledeleted(false)
    axios.get('/filenames')
    .then(res => {
      setFiles(res.data)
      setFilesloaded(true);
    })
  }, [fileDeleted, fileUploaded])




  function signIn(e) {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setError("Anna käyttäjänimi ja salasana!")
    } else {
      axios.post('/signin', { username: username, password: password })
        .then(res => {
          if (res.status === 200) {
            window.localStorage.setItem("loggeduser", username)
            setLogged(true)
          } else {
            setError("Väärä käyttäjänimi tai salasana!")
          }
        }).catch(err => {
          setError("Väärä käyttäjänimi tai salasana!");
        })
    }
  }





  return (
    <div className="App">
      {!logged ?
        <div className="App-login">
          <Login signIn={signIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} error={error} setError={setError} />
          <p>{error}</p>
        </div> :
        <div className="main">
          <header className="App-header">
            <Navigation username={username} setUsername={setUsername} password={password} setPassword={setPassword} currentfolder={currentfolder} setCurrentfolder={setCurrentfolder} logged={logged} setLogged={setLogged} exit={exit} />
          </header>
          {currentfolder !== null ?
            <div className="App-header2">
              <FolderContents currentfolder={currentfolder} setCurrentfolder={setCurrentfolder} files={files} filesloaded={filesloaded} fileUploaded={fileUploaded} setFileuploaded={setFileuploaded} setFiledeleted={setFiledeleted} foldercreated={foldercreated} setFoldercreated={setFoldercreated} Progress={Progress} />
            </div> :
            <div className="App-header2">
              <CreateFolder foldercreated={foldercreated} setFoldercreated={setFoldercreated} />
              <FoldersTable folders={folders} folderimage={folderimage} currentfolder={currentfolder} setCurrentfolder={setCurrentfolder} />
            </div>}
        </div>}
    </div>
  );
}

export default App;
