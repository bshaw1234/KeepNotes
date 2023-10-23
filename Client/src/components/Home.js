import React, { useState } from "react"
import Header from "./Header"
import axios from "axios"
import Footer from "./Footer"
import CreateNote from "./CreateNote"
import Note from "./Note"
import {useEffect} from "react"
import { Link,useNavigate } from 'react-router-dom'

const Home=()=>{
  const [bool, setbool]= useState(false)
  const navigate= useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('TOKEN')
        if(!token){
            navigate('/signin')
        }
    },[])

  const [addItem,setAddItem]=useState([]);


  useEffect(() => {
    const email=localStorage.getItem('EMAIL')
    axios.get(`http://localhost:5000/notes/${email}`).then(
        // &limit=10
    (response) => {
      setAddItem(response.data);
        // console.log(response);
    }
  );
  }, [bool]);


  const addNote=(note)=>{
    // alert("hi")
    console.log(note)
    var email=localStorage.getItem('EMAIL')
    axios.post('http://localhost:5000/note',
            {
                email: email,
                title: note.title,
                mesg: note.content
            })
      .then(res => {
              console.log(res)
              if (res.data.code === 200) {
                  setbool(!bool);
                // alert('Success.')
            } else {
                alert('Error occured')
            }
        }).catch(err => {
      console.log(err)
    })
    // window.location.reload(true);
  }

  const onDelete=(id)=>{
    // console.log(id);
    var email=localStorage.getItem('EMAIL')
    axios.delete(`http://localhost:5000/notes/${email}/${id}`)
            .then(res => {
              if (res.data.code === 200) {
                setbool(!bool);
                // alert('Success.')
            } else {
                alert('Error occured')
            }
        }).catch(err => {
      console.log(err)
    })
    // window.location.reload(true);
    // setAddItem((prevData)=>{
    //   return(
    //     prevData.filter((current,idx)=>{
    //       return idx!==id;
    //     })
    //   )
    // })
  }
  return (
  <>
    <Header/>
    <div className="temp">
    <CreateNote passNote={addNote}/>
    <div className="notei">
    {addItem.map((note)=>{
        return <Note
          
          id={note.id}
          title={note.title}
          content={note.message}
          deleteItem={onDelete}
        />
    })}
    </div>
    </div>
    <Footer/>
  </>
);};

export default Home;