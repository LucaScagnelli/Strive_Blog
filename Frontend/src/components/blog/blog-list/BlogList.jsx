import React from "react";
import { Col, Row } from "react-bootstrap";
//import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useState, useEffect } from "react";

const BlogList = props => {

  /* --------------------- */

  const token = JSON.parse(localStorage.getItem('token'))

  const [allPosts,setAllPosts]=useState([])

  const getAllPosts=async()=>{
    
    try {
      const rawData = await fetch (`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts/allPosts`,{
        headers:{
          "authorization": `bearer ${token}`
        }
      })
      const data = await rawData.json()
      console.log(data)
      await setAllPosts(data.data)
      return allPosts

    } catch (error) {
            console.error(error)
    }
  }

  useEffect(()=>{
    
    getAllPosts()
  },[])

  /* -------------------- */

  return (
    <Row>
      {allPosts.map((post, i) => (
        
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
