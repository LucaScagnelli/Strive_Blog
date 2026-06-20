import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = ()=>{

    const navigate = useNavigate()

    const loginButtonHandler = ()=>{
        navigate('/login')
    }

    const registerButtonHandler = ()=>{
        navigate('/registration')
    }

    return(
        <Container className="d-flex flex-column gap-3 mt-3">
            <h1>Benvenuto su Strive Blog!</h1>
            <div className="d-flex align-items-center gap-3">
                <p className="m-0 fs-4">Effettua il</p>
                <button type="button" className="btn btn-info" onClick={loginButtonHandler}>LOGIN</button>
            </div>
            <div className="d-flex align-items-center gap-3">
                <p className="m-0 fs-4">oppure </p>
                <button type="button" className="btn btn-info" onClick={registerButtonHandler}>REGISTRATI</button>
            </div>
        </Container>
    )
}

export default LandingPage