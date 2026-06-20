import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

    const navigate=useNavigate()

    const [formData,setFormData]=useState({})

    const formDataHandler= (e)=>{

        const {name,value}=e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const postAuthor = async (newAuthorData)=>{
        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/authors`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newAuthorData)
            })
            const data = await rawData.json()
            console.log(data)
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault()
        postAuthor(formData)
        navigate('/login')
    }

  return (
            <Container className="mt-5">
                <h1 className="mb-5">Registrati con noi</h1>
                <form className="d-flex flex-column gap-3 w-25" onSubmit={onSubmitHandler}>
                    <input type="text" name="name" placeholder="Insersci il tuo nome" onChange={formDataHandler}/>
                    <input type="text" name="lastname" placeholder="Insersci il tuo cognome" onChange={formDataHandler}/>
                    <input type="email" name="email" placeholder="Insersci la tua email" onChange={formDataHandler}/>
                    <input type="text" name="birthDate" placeholder="Insersci la tua data di nascita" onChange={formDataHandler}/>
                    <input type="text" name="avatar" placeholder="aggiungi il tuo avatar" onChange={formDataHandler}/>
                    <input type="password" name="password" placeholder="Inserisci la tua Password" onChange={formDataHandler}/>
                    <button type="submit">Registrati</button>
                </form>
            </Container>
  )
}

export default Registration
