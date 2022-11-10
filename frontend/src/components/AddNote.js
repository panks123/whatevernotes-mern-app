import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", content: "", tag: "" })
    const handleAddNoteBtnClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.content, note.tag)
        setNote({ title: "", content: "", tag: "" })
        props.showAlert("success", "Note was added successfully");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // To get the values from input fields (on Change) - Whichever input fields change 
    }

    return (
        <div className="container">
            <div className="card" style={{ border: "3px solid rgb(34, 34, 77)", backgroundColor: "rgba(0, 128, 255, 0.062)" }}>
                <div className="card-body">
                    <h5 className="card-title mx-2">Add a note</h5>
                    <div className="noteTitle">
                        <input className="title my-2 form-control" id='title' name="title" type="text" value={note.title} onChange={onChange} placeholder="Start writing note title" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows="3" placeholder="Start writing note content" id="content" name='content' value={note.content} onChange={onChange} />
                    </div>
                    <button disabled= {note.title.length <1 || note.content.length < 1} type="submit" className="btn btn-primary my-2 mx-2" onClick={ handleAddNoteBtnClick }>Add note</button>
                </div>
            </div>
            
            <hr />
        </div>
    )
}

export default AddNote
