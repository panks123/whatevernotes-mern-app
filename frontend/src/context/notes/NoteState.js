
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const host = process.env.REACT_APP_HOST_SERVER 
    const notesInitial =[]
    
    const [notes, setNotes] = useState(notesInitial)
  
    // Fetch All Notes
    const fetchAllNotes = async ()=>{
      // API call for adding note to DB
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setNotes(json)
    }

    // Add a note
    const addNote = async (title, content, tag)=>{
      // API call for adding note to DB
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,content,tag})
      });
      const note = await response.json(); // The added  note will bve returned by the backend
      setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = async (id)=>{
      // API call for deleting the note from DB
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });

      let newNotes = notes;

      if(response.status === 200)
      {
        newNotes = notes.filter((note)=>{
          return note._id !== id
        })
      }
      setNotes(newNotes)
    }

    // Update a note
    const updateNote = async (id, title, content, tag)=>{
      // API call for updating the note in DB
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, content, tag})
      });

      // creating a deep copy of 'notes'
      let newNotes = JSON.parse(JSON.stringify(notes))

      // Logic to edit in client side
      if(response.status === 200)
      {
        for(let element of newNotes)
        {
          if(element._id === id)
          {
            element.title = title
            element.content = content
            element.tag = tag;
            break;
          }
        }
      }
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;