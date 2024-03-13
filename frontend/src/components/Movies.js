import React, { useEffect, useState } from "react";
import '../App.css';

function Movies() {
    return (
        <div className="container">
        <div className="form-container">
            <form>
                <label>
                    Title:
                    <input type={"text"} name='title' className="text-box" />
                </label>
                <label>
                    Description:
                    <input type={"text"} name='description' className="text-box "/>
                </label>
                <input type={"submit"} className="submit-button"/>
            </form>
        </div>

        <div className="movie-output-container">

        </div>
        </div>
    );
}

export default Movies;