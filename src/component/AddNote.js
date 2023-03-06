import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const {showAlert} = props;

  const { addNote } = context;
  const [note, setNote] = useState({title:"" , description:"",tag:""});
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
 
    setNote({title:"" , description:"",tag:""})
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div className="container my-3">
          <form>
            <div className="row mb-3">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                value={note.title}
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={onChange}
                  name="title"
                  minLength={5}
                  required
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
                value={note.description}
                  type="text"
                  className="form-control"
                  id="description"
                  onChange={onChange}
                  name="description"
                  minLength={5}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="tag" className="col-sm-2 col-form-label">
                Tag
              </label>
              <div className="col-sm-10">
                <input
                value={note.tag}
                  type="text"
                  className="form-control"
                  id="tag"
                  onChange={onChange}
                  name="tag"
                  
                  required
                />
              </div>
            </div>

            <button
            disabled= { note.title.length<5 || note.description.length<5 || note.tag.length<5 }
              type="submit"
              className="btn btn-primary"
              onClick={handleclick}
            >
              Add Notes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
