import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

function Notes(props) {
    const context = useContext(noteContext)
    const { notes, fetchAllNotes ,updateNote} = context

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            fetchAllNotes()
        }
        else
        {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const [note, setNote] =useState({id:"", etitle: "", econtent: "", etag: ""})

    const updateNoteClientSide = (currentNote) => {
        ref.current.click() // To click the Button to launch the modal
        setNote({id:currentNote._id, etitle: currentNote.title, econtent: currentNote.content, etag: currentNote.tag})
    }

    const handleUpdateChangesBtnClick = (e) =>{
        e.preventDefault()
        updateNote(note.id, note.etitle, note.econtent, note.etitle)
        ref.current.click()
        props.showAlert("success", "Updated successfully")
    }
    const onChange =(e) =>{
        setNote({...note, [e.target.name]: e.target.value}) // To get the values from input fields (on Change) - Whichever input fields change 
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#exampleModal">
                Launch update modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                
                                <div className="noteTitle">
                                    <input className="title my-2 form-control" id='etitle' name="etitle" type="text" value={note.etitle} onChange={onChange} placeholder="Write your note title here" />
                                </div>

                                <div className="form-group">
                                    <textarea className="form-control" rows="3" placeholder="Write your note content here" id="econtent" name='econtent' value={note.econtent} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel update</button>
                            <button disabled= {note.etitle.length <1 || note.econtent.length < 1} type="button" className="btn btn-primary" onClick={handleUpdateChangesBtnClick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h2 className= "text-center">Your Notes</h2>
                <hr style={{ width:"95%", margin:"auto", borderTop:"2px solid black"}}/>
                {notes.length === 0 && <div className='text-center my-2'><b>Nothing to show... Use 'Add note' button above to add a note</b></div>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNoteClientSide ={()=>{ updateNoteClientSide(note)} } showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
