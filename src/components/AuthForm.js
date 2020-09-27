import React, {useState} from "react";
import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";

export default function AuthForm({role, history}) {
    const {setLoggedIn} = React.useContext(GlobalContext);

    const [authInfo, setAuthInfo] = useState( {
        username: "me",
        password: "123"
    })

    const handleChange = e => {
        setAuthInfo({
            ...authInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log(authInfo);
        axios.post( `https://better-professor-build-week.herokuapp.com/auth/login`, authInfo)
            .then(res => {
                console.log(res)
                    setLoggedIn(true);
                    localStorage.setItem("token", res.data.token)
                    history.push('/howtos')
            })
            .catch(err => console.log(err.message))
    }


    return (
        <div className="auth-page">
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={authInfo.username}
                    onChange={handleChange} />
                <input
                    name="password"
                    type="password"
                    value={authInfo.password}
                    onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )



}