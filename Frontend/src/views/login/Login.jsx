import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [formData,setFormData]=useState({})
    const [error,setError]=useState(false)
    const [decodedToken,setDecodedToken]=useState(null)

    const navigate = useNavigate()

    const formDataHandler=(e)=>{
        const {name,value}=e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const postLogin = async (formData)=>{
        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data = await rawData.json()

            if(rawData.ok){

                console.log(data)

                const decodedToken=jwtDecode(data.token)
                setDecodedToken(decodedToken)

                localStorage.setItem('token', JSON.stringify(data.token))

                navigate('/home')

                return data.token

            }else{
                setError(true)
            }

        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    const onSubmitHandler= async (e)=>{
        e.preventDefault()
        await postLogin(formData)
    }

    const signUpWithGoogleHandler = () => {
        window.location.href = `${process.env.REACT_APP_BASE_BACKEND_URL}/auth/google`
    }

    return(
        <>
            <Container className="mt-5">
                <h1 className="mb-5">Effettua il Login</h1>
                <form className="d-flex flex-column gap-3 w-25" onSubmit={onSubmitHandler}>
                    <input type="text" name="email" placeholder="Insersci la tua Email" onChange={formDataHandler}/>
                    <input type="password" name="password" placeholder="Inserisci la tua Password" onChange={formDataHandler}/>
                    <button type="submit">Login</button>
                </form>
            </Container>

            {error && (
                <Container className="mt-4">
                    <h3>Credenziali non valide</h3>
                </Container>
            )}

            <Container className="mt-4">
                <button type="button" className="btn btn-info" onClick={signUpWithGoogleHandler}>Sign up with Google</button>
            </Container>
        </>
    )
}

export default Login
