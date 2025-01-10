import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import { useNavigate  } from 'react-router-dom'
export default function Notes({showAlert}) {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const notes = context.notes;
    const setNotes = context.setNotes;
    const { getNotes,editNote } = context;
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            console.log("testtttt")
            getNotes(); // Fetch notes only if user is authenticated
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);
    const updateNote = (currentNote) => {
        console.log(currentNote)
        modal.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const onhandleclick = (e) => {
        e.preventDefault()
        editNote(note.id,note.etitle, note.edescription, note.etag)
        modal.current.click()
       
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const modal = useRef(null);
    return (

        <div className="mynote-section my-4">

            <button type="button" className="btn modalbutton" ref={modal} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Note Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" name="edescription" id="edescription" className="form-control" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" name="etag" id="etag" value={note.etag} className="form-control" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onhandleclick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h4 >My Notes</h4>

            <div className=" mx-2">
                {notes.length === 0 && 'No notes to display'}
            </div>
            <div className='row'>
            {notes.map((note,index) => {
                return (
                    <div className='col-md-4'>
                        <NoteItems index={index} key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>
                    </div>
                )
            })}
            </div>
        </div>

    )
}
