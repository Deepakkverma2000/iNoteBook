import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  let OPT=null;

  const Initialnotes = [];

  // Add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log(note);
    console.log(localStorage.getItem("token"));
    // Logic to add a new note at client side
    setNotes(notes.concat(note));
  };

  // Delete A note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(json);
    console.log("deleteing a note" + id);

    //Logic to delete at client side
    const newNotes = notes.filter((ele) => {
      return ele._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    // console.log(id, title, description, tag);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    // Logic to edit client
    let newNotes = JSON.parse(JSON.stringify(notes));
    console.log("Editing the note");
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
    }
    setNotes(newNotes);
  };
  // Fech all notes
  const fetchAllNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setNotes(json);
    console.log("Hello ,A ll Item");
  };
    
  

  const [notes, setNotes] = useState(Initialnotes);
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
