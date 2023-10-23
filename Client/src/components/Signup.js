import {useState} from "react"
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom'

const Signup= ()=>{
    const navigate=  useNavigate()
    const [otp_val,setotp] =useState("-1")
    const [data,setdata]= useState({
        email:"",
        password:"",
        otp:""
    })

    const [check,setcheck]= useState(true)

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
        axios.post('http://localhost:5000/signup',
            {
                email: email,
                password: password
            })
            .then(res => {
                if (res.data.code === 200) {
                    alert('Signup Success.')
                    navigate('/signin')
                } else {
                    alert('Error occured')
                }
            }).catch(err => {
                console.log(err)
            })
    }


    const sendOTP=async()=>{
        // setotp(Math.floor(Math.random()*10000));
        alert('Wait .....')
        const email = data.email;
        const otpv= Math.floor(Math.random()*10000);
        setotp(otpv);

        axios.post('http://localhost:5000/sendemail',
            {
                email: email,
                otp_val: otpv
            })
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 500) {
                    alert('Email already registered.')
                } 
                else if (res.data.code === 200) {
                    alert('Otp sent Successfully.')
                } else {
                    alert('Error.')
                }
            }).catch(err => {
                console.log(err)
            })
        
        // console.log(otp_val)
    }

    const verify=()=>{
        // console.log(otp_val)
        if(data.otp == otp_val){
            setcheck(false)
            alert("Email address verified...");
        }
        else{
            alert("Invalid OTP");
        }
    }

 
    return(
        <>
            <div className="dash">
            <div className="board">
            <h1 className="center">SIGNUP</h1>
            <div className="outcard">
                
                Email
                <input 
                    className="inputs" 
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={InputEvent}
                    placeholder="Enter Your email"
                /> <br/> <br/>
                <button onClick={sendOTP} className="btns" >SEND OTP</button>
            
                <br/> <br/>
    
                OTP <input 
                    className="inputs" 
                    name="otp"
                    type="otp"
                    value={data.otp}
                    onChange={InputEvent}
                    placeholder="Enter OTP sent to your mail"
                /> 
                <br/> <br/>
                <button onClick={verify} className="btns" >VERIFY</button>
                <br/> <br/>

                


                Password <input 
                    className="inputs" 
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={InputEvent}
                    placeholder="Set your password"
                    /> <br/> <br/>

                
                <button onClick={handleSubmit} className="btns" style={{ backgroundColor: check ? 'grey' : '#0050b1' }} disabled={check}> SUBMIT </button>
                <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/signin'}> SIGN IN </Link>
            </div>
            </div>
            </div>
        </>
    )
}

export default Signup; 