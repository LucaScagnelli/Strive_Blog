import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem.jsx";

const BlogListPerAuthor = () => {

    const [id, setId] = useState("")
    const [postsArray, setPostsArray] = useState([])

    const token = JSON.parse(localStorage.getItem('token'))

    const idHandler = (e) => {
        setId(e.target.value)
    }

    const getPostsPerAuthor = async (id) => {
        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/authors/${id}/blogPosts`, {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })
            const data = await rawData.json()
            setPostsArray(data.authorPosts)
            return data

        } catch (error) {
            console.error(error)
        }
    }

    const getAllPosts = async () => {

        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts/allPosts`, {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })
            const data = await rawData.json()
            await setPostsArray(data.data)
            return postsArray

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id === "") {
            getAllPosts()
        } else {
            getPostsPerAuthor(id)
        }
    }, [id])

    return (
        <>
            <Row className="mb-4">
                <Col className="d-flex align-items-center gap-3">
                    <p className="fs-5 m-0">Immetti l'ID dell'Autore</p>
                    <input type="text" name="authorIdToSearch" onChange={idHandler} />
                </Col>
            </Row>
            <Row className="row-cols-3">
                {postsArray.map((post, i) => (
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
        </>
    )
}

export default BlogListPerAuthor
