import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material-next/Button';

const CreateNote=(props)=>{
  const [note,setnote]= useState({
    title:"",
    content:"",
  })

  const InputEvent=(event)=>{
    const value=event.target.value;
    const name=event.target.name;
    setnote((prevData)=>{
      return{
        ...prevData,
        [name]:value,
      }
    })
  }

  const addEvent=()=>{
    props.passNote(note);
    setnote({
      title:"",
      content:"",
    })
  }
  return (<>
    <div className= "main_note"> 
        <form >
            <input 
              type="text" 
              className="inputz" 
              placeholder="Title" 
              name="title"
              value={note.title}
              onChange={InputEvent}
              autoComplete='off'/>
            <textarea 
              rows="" 
              column=""
              name="content"
              value={note.content}
              onChange={InputEvent}
              placeholder="Write a note..."
            ></textarea>
            <Button onClick={addEvent}>
              <AddIcon className="plus_sign"/>
            </Button>
        </form>

    </div>
  </>
)};

export default CreateNote;