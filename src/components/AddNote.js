import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
export default function AddNote({showAlert}) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title : "", description : "", tag : ""});
    const onhandleclick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title : "", description : "", tag : ""});
        showAlert("Note added successfully","success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
  return (
     <div className='container'>
                <div className='addSection my-4'>
                    <h4 className='my-3'> Add new note</h4>
                    <form>
                        <div className="mb-3">
                            <label  className="form-label">Note Title</label>
                            <input type="text" className="form-control" id="title"  value={note.title} name="title" onChange={onChange}/>
                               
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea type="text" name="description" id="description" className="form-control" value={note.description} onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tag</label>
                            <input type="text" name="tag" id="tag" className="form-control"  value={note.tag} onChange={onChange}/>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={onhandleclick}>Submit</button>
                    </form>
                </div>
                
            </div>
  )
}
