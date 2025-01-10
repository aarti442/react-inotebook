
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  const [alert, setAlert] = useState(null)

  // Function to update the message dynamically
  const showAlert = (msg,type) => {
    console.log(msg);
    setAlert({msg:msg,type : type});

    // Clear the message after a few seconds (optional)
    setTimeout(() => setAlert(''), 3000);
  };
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>

            <Route exact path="/" element={<Home showAlert={showAlert}/>}>

            </Route>
            <Route exact path="/about" element={<About showAlert={showAlert}/>}>

            </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
                
              </Route>
              <Route exact path="/signup" element={ <Signup showAlert={showAlert}/>}>
               
              </Route>

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
