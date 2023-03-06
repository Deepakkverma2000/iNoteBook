import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
   
  const { deleteNote,editNote} = context;

  const { note,updateNote } = props;

  const handleDelete =(id)=>{
    // console.log(id);

    deleteNote(id);
    props.showAlert("Deleted Successfully","Success");
  }
 
  return (
    <div className="col-md-3"  style={{width: '18rem'}}>
      
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>handleDelete(note._id)}></i>
          <i className="fa-sharp fa-solid fa-pen-to-square mx-3" onClick={()=>updateNote(note)}></i>
        </div>
      </div>
    </div>
  );
}
