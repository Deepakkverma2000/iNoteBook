import React, { useContext, useRef,useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes( props) {
  const {showAlert} = props;
  const refClose = useRef(null);
let navigate = useNavigate();
  const context = useContext(noteContext);
  const [note, setNote] = useState({_id:"",etitle:"" , edescription:"",etag:""});

  const { notes, fetchAllNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchAllNotes();
    }
    else{
           navigate('/login');
    }
  }, []);

  const updateNote = (currentNote) => {
    
    ref.current.click();
    setNote({_id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
   
  };
  const handleclick = (e) => {
    
    console.log("Updating the note",note);
    editNote(note._id,note.etitle,note.edescription,note.etag);
    showAlert("Successfully Note Updated","Success");
    refClose.current.click();
  };

  const ref = useRef(null);
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert}  />
     
<a type="button" className="btn btn-primary d-none" data-bs-toggle="modal"  ref ={ref} data-bs-target="#exampleModal" >
  Launch demo modal
</a>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
            <div className="row mb-3">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                value={note.etitle}
                  type="text"
                  className="form-control"
                  id="etitle"
                  onChange={onChange}
                  name="etitle"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                {" "}
                description
              </label>
              <div className="col-sm-10">
                <input
                value={note.edescription}
                  type="text"
                  className="form-control"
                  id="edescription"
                  onChange={onChange}
                  name="edescription"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="tag" className="col-sm-2 col-form-label">
                Tag
              </label>
              <div className="col-sm-10">
                <input
                value={note.etag}
                  type="text"
                  className="form-control"
                  id="etag"
                  onChange={onChange}
                  name="etag"
                />
              </div>
            </div>

            
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{handleclick(note)}}>Edit Note</button>
      </div>
    </div>
  </div>
</div>

      <div className=" container">
        <div className="row  my-3">
          <h1>your all notes</h1>
          {notes.length === 0 && "No Notes to show "}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
}
