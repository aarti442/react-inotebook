
import { useEffect } from "react"
import AddNote from "./AddNote"
import Notes from "./Notes"
import { useNavigate  } from 'react-router-dom'

export default function Home({showAlert}) {
    const navigate = useNavigate();
    console.log(localStorage.getItem('token'))
   useEffect(() => {
          if(localStorage.getItem('token') === '' || localStorage.getItem('token') === null){
            navigate("/login")
          }
          // eslint-disable-next-line
      }, []);
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                <AddNote showAlert={showAlert}/>
                </div>
                <div className="col-md-8">
                <Notes showAlert={showAlert}/>
                </div>
            </div>
            
          
        </div>
    )
}
