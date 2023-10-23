import React from "react"
import {useEffect} from "react"
import { Link,useNavigate } from 'react-router-dom'

const Header=()=>{
  const navigate= useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('TOKEN')
        if(!token){
            navigate('/signin')
        }
    },[])
  return(
  <>
    <div className="card"> 
        {/* <img src="https://picsum.photos/200" alt="logo" width="70" height="50"/> */}
        <h1 > Keep Notes </h1>
        <div>
            <span> {localStorage.getItem('EMAIL')}</span>
            <button
                onClick={()=>{
                  localStorage.clear()
                  navigate('/signin')
                }}
            >LOGOUT</button>
        </div>
    </div>
  </>
  )
};
export default Header;