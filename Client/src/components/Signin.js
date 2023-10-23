import {useState} from "react"
import axios from "axios"
import { Link , useNavigate} from 'react-router-dom'

const Signin= ()=>{
    const navigate=  useNavigate()
    const [data,setdata]= useState({
        email:"",
        password:"",
    })

    const InputEvent=(e)=>{
        const {name,value}=e.target;
        setdata((prevvalue)=>{
            return{
                ...prevvalue,
                [name]:value,
            }
        })
    }

    const handleSubmit = () => {
        // console.log(email, password)
        const email=data.email
        const password= data.password
        axios.post('http://localhost:5000/signin',
            {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 500) {
                    alert('User not found')
                } 
                if (res.data.code === 404) {
                    alert('Password is Wrong')
                } 
                if (res.data.code === 200) {
                    navigate('/')
                    localStorage.setItem('TOKEN',res.data.token)
                    localStorage.setItem('EMAIL',res.data.email)
                }
            }).catch(err => {
                console.log(err)
            })
    }


    return(
        <>
            <div className="dash">
            <div className="board">
                <h1 className="center">SIGNIN</h1>
                <div className="outcard">

                    Email <input 
                        className="inputs" 
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={InputEvent}
                    /> <br/> <br/>

                    Password <input 
                        className="inputs" 
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={InputEvent}
                        /> <br/> <br/>
                    <button onClick={handleSubmit} className="btns"> SUBMIT </button>
                    <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                    to={'/signup'}> SIGN UP </Link>
                </div>
            </div></div>
        </>
    )
}

export default Signin; 