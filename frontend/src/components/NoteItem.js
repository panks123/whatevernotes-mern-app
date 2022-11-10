import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context;

    const { note, updateNoteClientSide } = props;

    const formattedTimeStamp = (date)=>{
        let dat = new Date(date)
        return dat.toLocaleString('default', { month: 'short' }) + " " + dat.getDate() + ", " + dat.getFullYear()
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ backgroundColor: "ghostwhite" , boxShadow: "0 0 1px 1px rgba(0,0,0,0.5)"}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{ zIndex: 1, right: '-28px' }}>
                    {formattedTimeStamp(note.timestamp)}
                </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: note.content }}/>
                </div>
                <div className="d-flex flex-wrap justify-content-around mb-2">
                    <button type="button" className="btn btn-primary btn-sm my-1" onClick={() => { updateNoteClientSide() }}>Update note</button>
                    <button type="button" className="btn btn-danger btn-sm my-1" onClick={() => { deleteNote(note._id); props.showAlert("success", "Deleted successfully"); }}>Delete note</button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
