import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';
import Header from "../components/Header";

function Movie() {
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [values, setValues] = useState({
        title: '',
        description: '',
        completed: false
    })

    const { id } = useParams()
    const navigate = useNavigate();


    const API_BASE = process.env.NODE_ENV === 'development'
	? `http://localhost:9000/api/v1`
	: process.env.REACT_APP_BASE_URL;

	let ignore = false;
	useEffect(() => {
        if(!ignore){
            getMovie();
        }

        return () => {
            ignore = true;
        }
	}, [])

	const getMovie = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/movies/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log({data})
                        setValues({
                            title: data.title,
                            description: data.description,
                            completed: data.completed
                        })
                    })
        } catch(error) {
            setError(error.message || "Unexpected Error")
        } finally {
            setLoading(false)
        }
	}

	const deleteMovie = async () => {
		try {
			await fetch(`${API_BASE}/movies/${id}`, {
				method: 'DELETE'
			})
                    .then(res => res.json())
                    .then(data => {
                    setMovies(data)
                    navigate("/dashboard", { replace: true })
                    })
		} catch(error) {
			setError(error.message || "Unexpected Error")
		} finally {
			setLoading(false)
		}
	}

	const updateMovie = async () => {
		try {
			await fetch(`${API_BASE}/movies/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
        })
                    .then(res => res.json())
                    .then(data => {
                    console.log({data})
                    })
		} catch(error) {
			setError(error.message || "Unexpected Error")
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		updateMovie();
	}

	const handleInputChanges = (e) => {
        e.persist()

        const value = e.target.type === 'checkbox' 
        ? e.target.checked 
        : e.target.value

        setValues((values) => ({
            ...values,
            [e.target.name]: value
        }))
    }

    return (
        <div>
            <Header />
            <div className="container">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label>
                        Title:
                        <input 
                        type={"text"} 
                        name='title' 
                        value={values.title} 
                        onChange={handleInputChanges} 
                        className="text-box" />
                    </label>

                    <label>
                        Description:
                        <input 
                        type={"text"} 
                        name='description' 
                        value={values.description} 
                        onChange={handleInputChanges} 
                        className="text-box "/>
                    </label>

                    <label className="completed">
                        Completed
                        <input 
                        type={"checkbox"}
                        name='completed'
                        checked={values.completed}
                        onChange={handleInputChanges}
                        className='check-box' />
                    </label>

                    <input type={"submit"} value='Submit' className="submit-button"/>
                </form>

                <div className="movie-output-container">
                    <h1>{values && values.title}</h1>
                    <h2>{values && values.description}</h2>
                    <label className="completed">
                        <h3 style={styles.text}>Completed</h3>
                        <input 
                    type={"checkbox"}
                    name='completed'
                    checked={values && values.completed}
                    onChange={handleInputChanges}
                    className='check-box' />
                    </label>
                    <button onClick={() => deleteMovie()} className='submit-button'>Delete Movie</button>
                </div>

            </div>
        </div>
    );
}

export default Movie;

const styles = {
    text: {
        color: 'black'
    }
}