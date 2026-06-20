import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem.jsx";

const BlogListPerTitle = () => {

    const [title, setTitle] = useState("")
    const [postsArray, setPostsArray] = useState([])

    const token = JSON.parse(localStorage.getItem('token'))

    const titleHandler = (e) => {
        const lowerCaseRawTitle = e.target.value.toLowerCase()
        setTitle(lowerCaseRawTitle)
    }

    const getPostsPerTitle = async (title) => {
        try {
            const rawData = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/blogPosts?title=${title}`, {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })
            const data = await rawData.json()
            setPostsArray(data.posts)
            return data

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPostsPerTitle(title)
    }, [title])

    return (
        <>
            <Row className="mb-4">
                <Col className="d-flex align-items-center gap-3">
                    <p className="fs-5 m-0">Immetti il Titolo del Post</p>
                    <input type="text" name="TitleToSearch" onChange={titleHandler} />
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

export default BlogListPerTitle
