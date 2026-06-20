import React, { useCallback, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import {convertToRaw} from "draft-js"
import draftToHtml from "draftjs-to-html"
const NewBlogPost = props => {

  //logica post del post
  
  const [formData, setFormData]=useState({})

  const inputChangeHandler=(e)=>{
    const {value,name}= e.target
    setFormData({...formData,[name]:value})
  }

  const postPost =async(body)=>{
    try {
      const rawData =await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts`,{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      })
      const data = await rawData.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  //logica patch dell'immagine di cover

  const [fileImgToUpload,setFileImgToUpload]=useState(null)
  const [id,setId]=useState("")
  const [imgUrl,setImgUrl]=useState("")

  const setFileHandler =(e)=>{
    setFileImgToUpload(e.target.files[0])
  }

  const idHandler= (e)=>{
    setId(e.target.value)
  }

  const uploadCoverImgInCloud = async (file)=>{

    const fileData = new FormData()
    fileData.append("img",file)

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts/cover`,{
        method:"PATCH",
        body:fileData
      })
      const resImg = await response.json()
      console.log(resImg.img)
      setImgUrl(resImg.img)
      return resImg
      
    } catch (error) {
      console.error(error)
    }
  }

  const uploadCoverImgInPost =async (id)=>{
    try {
      const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          cover:imgUrl
        })
      })
      const data = await rawData.json()
      console.log(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
  if (imgUrl && id) {
    uploadCoverImgInPost(id)
  }
}, [imgUrl])

  //renderizzazione

  return (
    <Container className="new-blog-container">
      <h3 className="mt-5">Aggiungi un nuovo Post</h3>
      <Form className="mt-4 w-25 d-flex flex-column gap-3" onSubmit={(e)=>{
        e.preventDefault()
        postPost(formData)
        }}>
        <Form.Group controlId="blog-form" className="d-flex flex-column">
          <Form.Label>Titolo</Form.Label>
          <input type="text" name="title" onChange={inputChangeHandler}></input>
        </Form.Group>
        <Form.Group controlId="blog-category" className="d-flex flex-column">
          <Form.Label>Categoria</Form.Label>
          <select name="category" onChange={inputChangeHandler}>
            <option value="sciFi">Categoria 1</option>
            <option value="sciFi">Categoria 2</option>
            <option value="sciFi">Categoria 3</option>
            <option value="sciFi">Categoria 4</option>
            <option value="sciFi">Categoria 5</option>
          </select>
        </Form.Group>
        <Form.Group controlId="blog-form" className="d-flex flex-column">
          <Form.Label>ReadTime</Form.Label>
          <div className="d-flex justify-content-between">
            <input className="form-control w-50" type="number" placeholder="time" name="time"></input>
            <input className="form-control w-50" type="text" placeholder="unit" name="unit"></input>
          </div>
        </Form.Group>
        <Form.Group controlId="blog-form" className="d-flex flex-column">
          <Form.Label>Autore</Form.Label>
          <input type="text" name="author" onChange={inputChangeHandler}></input>
        </Form.Group>
        <Form.Group controlId="blog-content" className="d-flex flex-column">
          <Form.Label>Contenuto Blog</Form.Label>
          <textarea name="content" onChange={inputChangeHandler}></textarea>
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
      <h3 className="mt-5">Aggiungi una Cover al tuo Post</h3>
      <div className="mt-4 w-50 d-flex flex-column gap-3">
        <input type="text" name="postToPatchId" placeholder="ID del post da modificare..." onChange={idHandler}/>
        <input type="file" name="img" onChange={setFileHandler}/>
        <Button
            type="button"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            className="w-25 align-self-end"
            onClick={async (e)=>{
              await uploadCoverImgInCloud(fileImgToUpload)
              //await uploadCoverImgInPost(id)
            }}
          >
            Upload
          </Button>
      </div>
    </Container>
  );
};

export default NewBlogPost;
