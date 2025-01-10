import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({ showAlert, children }) => {
    const host = "http://localhost:5000"
    const notesdata = [];
    
    const [notes, setNotes] = useState(notesdata);

    const getNotes = async () => {
        // API Call 
        const token = localStorage.getItem("token");
        console.log(`${host}/api/notes/fetchallnotes`);
        console.log(`${token}`);
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    //Add Note
    const addNote = async (title, description, tag) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        if (note.errors) {
            {
                note.errors.map((error) => {
                    return (
                        showAlert(error.msg, "danger")
                    )
                })
            }

        } else {
            setNotes(notes.concat(note))
            showAlert("Note added successfully", "success")
            console.log(note)
        }

    }

    //Delete Note
    const deleteNote = async (id) => {
        const token = localStorage.getItem("token");
        console.log("delete note " + id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        });
        const json = response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        showAlert("Note deleted successfully", "success")

    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(JSON.parse(JSON.stringify(json)))
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        setNotes(newNotes);
        if (json.errors) {
            {
                json.errors.map((error) => {
                    return (
                        showAlert(error.msg, "danger")
                    )
                })
            }

        } else {

            showAlert("Note updated successfully", "success")

        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, setNotes, getNotes, editNote }}>
            {children}
        </noteContext.Provider>
    )
}
export default NoteState;