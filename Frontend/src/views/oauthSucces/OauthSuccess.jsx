import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'

const OauthSuccess = () => {

    const navigate = useNavigate()

    const [searchParams]=useSearchParams()
    
    const token = searchParams.get("token")
    localStorage.setItem('token',JSON.stringify(token))

  return (
    <Container className='mt-3'>
        <h1>Che Success!</h1>
        <div className="d-flex align-items-center gap-3">
                <p className="m-0 fs-4">Ora puoi accedere a </p>
                <button type="button" className="btn btn-info" onClick={()=>{
                    navigate('/home')
                }}>STRIVE BLOG</button>
            </div>
    </Container>
  )
}

export default OauthSuccess
