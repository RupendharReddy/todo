import React, { useEffect, useState } from 'react'
import './components.css'
import workgif from '../icons/workgif.gif'
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
export default function Login({ setIsLoggedIn }) {

  const navigation=useNavigate();

  let [log,setLog]=useState(true);

  useEffect(()=>{
    if(window.localStorage.getItem('mytoken'))
    {
      navigation("/home")
    }
  },[])

  const logsubmit = async(e)=>{
    e.preventDefault()
    const email=e.target.email.value;
    const pass=e.target.password.value;
      axios.get("/login",{
        params:{
          email:email,
          password:pass
        }
      }).then((response)=>{
        console.log(response.data);
        const data=response.data;
        if(data.is_success){
          window.localStorage.setItem('mytoken',data.data.token)
          navigation("/home")
        }
        else{
          alert(data.error)
        }
      }).catch((error)=>{
        console.log(error);
      })


      
    
  }
  const signinsubmit = async(e)=>{
    e.preventDefault()
    try {
      const response= await axios.post('/signin',{
        username:e.target.name.value,
        email:e.target.email.value,
        password:e.target.password.value
      })
      console.log(response.data);
      alert(response.data);
      // if(response.data=="")
      // {
      //   alert("Account already exists ")
      //   setLog(true)
      // }
    } catch (error) {
      console.log("error in signin submit catch");
    }

  }

  return (
    <div className='content logdiv'>
      {/* <div className='logdiv'> */}
      <div className='loginform'>
      <>
        {log?(
          <form onSubmit={logsubmit}>
          <div className='login'>
            <center><h1>Login</h1></center>
            <input type='text' name='email' required={true} placeholder='Email---username'/><br/><br/>
            <input type='password' name='password' required={true} placeholder='Password'/><br/><br/>
            <button type='submit'>Login</button><br/><br/>
          </div>
          <div className='checkbox'>
            Don't have account
            <input type='checkbox' className='check' onClick={(e)=>setLog(false)} /><br/><br/>
          </div>
          </form>

          ):(
            <form onSubmit={signinsubmit}>
            <div className='signin'>
              <center><h1>Signin</h1></center>
              <input type='email'name='email' required={true} placeholder='Email'/><br/><br/>
              <input type='text' name='name' required={true} placeholder='Username'/><br/><br/>
              <input type='password' name='password' required={true} placeholder='Password'/><br/><br/>
              <button type='submit'>signin</button><br/><br/>
            </div>
            <div>
              Do u have account?
              <input type='checkbox' className='check' onClick={(e)=>setLog(true)} /><br/><br/>

            </div>
            </form>
            )}
        </>
      </div>
      {/* </div> */}
      <div className='logtitle'>
        <h1>Organize your daily tasks </h1>
        <div className='workgif'>
          <img src={workgif} alt='working gif'/>
        </div>
      </div>
  </div>
  )
}
