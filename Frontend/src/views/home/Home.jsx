import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import BlogListPerAuthor from "../../components/blog/blog-list/BlogListPerAuthor";
import BlogListPerTitle from "../../components/blog/blog-list/BlogListPerTitle";
import Welcome from "../../components/welcome/Welcome.jsx";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <Container fluid="sm">
      <div className="d-flex align-items-end justify-content-between">
        <Welcome />
        <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Nuovo Articolo
        </Button>
      </div>
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <h2 className="blog-section-title mb-3 mt-3">I nostri Blog</h2>
      <BlogList />
      <h2 className="blog-section-title mb-3 mt-3">Cerchi un autore in particolare?</h2>
      <BlogListPerAuthor/>
      <h2 className="blog-section-title mb-3 mt-3">Cerchi un titolo in particolare?</h2>
      <BlogListPerTitle/>
    </Container>
  );
};

export default Home;
