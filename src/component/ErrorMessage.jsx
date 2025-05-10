import React from 'react'
function ErrorMessage(props) {
    return (
        <p style={{ color: 'red' }}>{props.error}</p>
    )
}

export default ErrorMessage
