import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate} from "react-router-dom";
import Alert from './Alert';

export default function Login({showAlert}) {
     // const host = 'http://localhost:5000';
     const host = process.env.REACT_APP_HOST
    let location = useLocation();
    let message = location.state?.message; 
  
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
   
    useEffect(() => {
        // Check for a message in location.state
        if (location.state?.message) {
            console.log("Displaying alert and clearing state.");
            showAlert(location.state.message, "success");
            
            // Clear the state by navigating to the same path without the state
            navigate(location.pathname, { replace: true });
            
        }
    }, [location.state, location.pathname, navigate, showAlert]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");

        }
        else{
           // alert("Invalid credentials");
            showAlert("Invalid credentials","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
           
            <div className='row  justify-content-center align-items-center my-4'>
            <div className='col-md-5'>
            {/* <Alert alert={alert}/> */}
                    <h2 className='my-3'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email <span className='required'>*</span></label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                         
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password <span className='required'>*</span></label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} required/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                </div>
        </div>
    )
}
