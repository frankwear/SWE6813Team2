import React, { useState } from 'react'
//hooks
import { useLogin } from '../hooks/useLogin'
//styles
import '../styles/login.css'
import "../styles/loading.css";
//components
import Loading from '../components/Loading/Loading.jsx'



export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
           e.preventDefault()
           login(email, password)
       }

    return (
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>login</h2>
                <label>
                    <span>email:</span>
                    <input
                        required
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>password:</span>
                    <input
                        required
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </label>

                {!isPending && <button className='btn'>login</button>}
                {isPending && <button className='btn' disabled>loading</button>}
                {error && <div className='error'>{error}</div>}

            </form>
        )
    }