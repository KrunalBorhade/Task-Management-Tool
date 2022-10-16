import React, { useState } from 'react'
import { Container } from '@mui/system';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const registerData = async (e) => {

    try {
      let res = await fetch("https://presolv-task.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      let data = await res.json()
      console.log(data)
      if (res.status === 200) {
        navigate("/show", { replace: true })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const regData = (e) => {
    e.preventDefault()
  }

  return (
    <div style={{ backgroundColor: "rgb(200,246,255)", height: "100vh", position: "absolute", width: "100%" }}>
      <Container sx={{ bgcolor: 'info.main', border: '1px solid', height: '550px', mt: "20px" }}>
        <h2>Sign In</h2>
        <form onSubmit={regData}>

          <TextField id="outlined-basic" value={email} type="email" label="email" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setEmail(e.target.value)} /><br />
          <TextField id="outlined-basic" type="password" label="password" variant="outlined" required sx={{ mt: '10px' }} onChange={(e) => setPassword(e.target.value)} /><br />
          <Button sx={{ mt: '30px' }} variant="contained" onClick={registerData}>Log In</Button>
        </form>
        <p>{message}</p>

      </Container>
    </div>
  )
}
