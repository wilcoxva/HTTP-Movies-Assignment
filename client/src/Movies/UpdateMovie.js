import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateMovie = (props) => {

    const [info, setInfo] = useState("");
    const {id} = useParams();
    const history = useHistory();

    const handleChanges = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(info)
        axios
        .put(`http://localhost:5000/api/movies/${id}`, {id: id, title: info.title, director: info.director, metascore: Number(info.metascore), stars: [info.stars]})
        .then(res => {
            history.push('/');
        })
        .catch(err => console.log(err))
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input name="title" placeholder="title" value={info.title} onChange={handleChanges}/>
                <input name="director" placeholder="director" value={info.director} onChange={handleChanges}/>
                <input name="metascore" placeholder="metascore" value={info.metascore} onChange={handleChanges}/>
                <input name="stars" placeholder="stars" value={info.stars} onChange={handleChanges}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default UpdateMovie;