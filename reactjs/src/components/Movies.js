import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Movies() {
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        title: '',
        description: '',
        rating: 1 
    })

    const API_BASE = process.env.NODE_ENV === 'development'
    ? `http://localhost:9000/api/v1`
    : process.env.REACT_APP_BASE_URL;
    let ignore = false
    useEffect(() => {
        if (!ignore){
            getMovies()
        }

        return () => {
            ignore = true
        }
    }, [])

    const getMovies = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/movies`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setMovies(data)
                    })
        } catch(error){
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    }

    const addMovie = async () => {
        try {
            await fetch(`${API_BASE}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(() => getMovies())
        } catch(error) {
                setError(error.message || "Unexpected Error")
        } finally {
                setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addMovie()
    }

    const handleInputChanges = (e) => {
        e.persist()

        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="container">
        <div className="form-container">
            <form on onSubmit={(e) => handleSubmit(e)}>
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

                <label>
                    Rating:
                    <input 
                    type={"number"}
                    name='rating'
                    checked={values.rating}
                    onChange={handleInputChanges}
                    className='text-box' />
                </label>

                <input type={"submit"} value='Submit' className="submit-button"/>
            </form>
        </div>

        <div className="movie-output-container">
            <ul>
            {
                movies?.map(movie => (
                <li key={movie._id}>
                    <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </li>
                ))
            }
            </ul>
        </div>
        </div>
    );
}

export default Movies;