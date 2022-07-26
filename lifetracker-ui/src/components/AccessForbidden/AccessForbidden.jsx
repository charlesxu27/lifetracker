import React from 'react'
import { Link } from "react-router-dom"
import "./AccessForbidden.css"

export default function AccessForbidden() {
    return (
        <div>
            <h1>Unauthorized!</h1>
            <p>
                <Link to="/register">Create an account</Link> or <Link to="/login">log in</Link> to use this functionality.
            </p>
        </div>
    )
}
