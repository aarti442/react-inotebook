import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

export default function Signup({showAlert}) {
      // const host = 'http://localhost:5000';
      const host = process.env.REACT_APP_HOST
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword : ""}) 
    
    const handleSubmit = async (e) => {
        console.log("Event object: ", e); // Log the event object
        e.preventDefault(); // Prevent the default form submission behavior
        const { name, email, password, cpassword } = credentials;
    
        if (password !== cpassword) {
            showAlert("Passwords do not match","danger");
            return;
        }
    
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            const json = await response.json();
            console.log(json);
    
            if (json.success) {
                //localStorage.setItem("token", json.authtoken);
                navigate("/login",{ state: { message: "Account created successfully!" } });
            } else {
                alert(json.error || "Failed to create user");
            }
        } catch (err) {
            console.error("Fetch error: ", err);
           // alert("An error occurred while creating the user.");
            showAlert("An error occurred while creating the user","danger");
        }
    };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container  justify-content-center align-items-center'>
             <div className='row  justify-content-center align-items-center'>
             <div className='col-md-5'>
            <h2 className='mt-3'>SignUp</h2>
                
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label for="name" className="form-label">Name <span className='required'>*</span></label>
                    <input type="name" className="form-control" name="name" id="name" onChange={onChange} required/>
                    
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email <span className='required'>*</span></label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                    
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password <span className='required'>*</span></label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label for="cpassword" className="form-label">Confirm Password <span className='required'>*</span></label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            </div>
            </div>
        </div>
    )
}
