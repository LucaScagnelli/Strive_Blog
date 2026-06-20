import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Welcome = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const[currentUserData,setCurrentUserData]=useState({})

    const getCurrentUserData = async ()=>{
        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/authors/me`,{
                headers:{
                        "authorization": `bearer ${token}`
                        }
                }
            )
            const data = await rawData.json()
            console.log(data)
            setCurrentUserData(data)
            return(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getCurrentUserData()
    },[])

  return (
    <div className='d-flex justify-content-center align-items-center gap-3 w-25 bg-warning rounded-3'>
        <p className='m-0 fs-2'>Welcome</p>
        <p className='m-0 fs-2 fw-bold'>{currentUserData.name}</p>
    </div>
  )
}

export default Welcome