import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
export default function NoteItems(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const noteitems = props.note;
    const updateNote = props.updateNote;
    const index = props.index
    const classesArray = [
        "text-bg-primary",
        "text-bg-danger",
        "text-bg-success",
        "text-bg-warning",
        "text-bg-info",
        "text-bg-secondary"
    ];
    return (
        <div className={`card mb-3 ${classesArray[index % classesArray.length]}`} style={{ maxWidth: '18rem' }}>
            <div className="card-header d-flex">
                <div className='title'>{noteitems.tag}</div>
                <div className='action txt-right' style={{ textAlign: 'right' }}>
                    <i className="fa fa-solid fa-trash mx-2" onClick={() => {deleteNote(noteitems._id)}}></i>
                    <i className="fa fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(noteitems)}}></i></div>
            </div>
            <div className="card-body">
                <h6 className="card-title"> {noteitems.title}</h6>
                <p className="card-text"> {noteitems.description}</p>
            </div>
            
        </div>

    )
}
