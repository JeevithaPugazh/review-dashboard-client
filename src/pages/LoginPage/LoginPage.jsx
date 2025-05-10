import React, {useState} from 'react'
import { handleLogin } from '../../utilities/apis/login-api';
import { useNavigate } from 'react-router-dom';



function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');
    const nav = useNavigate()
    const submitHandler = async(e) =>{
        e.preventDefault();
        setError('');
        const result = await handleLogin(email,password);
        if(!result.success){
            setError(result.message);
        }else{
            console.log("Login sucessful")
            nav("/productPage")
        }
    }
    return (
        <div>
            <h1>Login</h1>
        <form onSubmit={submitHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder = "Email" required/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password" required/>
        <button type="submit">Login</button>
        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default LoginPage
