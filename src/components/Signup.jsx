import { useState } from "react"
import apiServices from '../services/apiService';
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [singin, setSignIn] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email){
            setError(!error);
            setErrorMessage('email cannot be empty');
        }else if(!password){
            setError(!error);
            setErrorMessage('password cannot be empty');
        }
        if(!singin){
            async function login(){
                const message = await apiServices.Login(email, password);
                if(message == 'Login successfully'){
                    navigate('/dashboard')
                }else{
                    setError(!error);
                    setErrorMessage('Unauthorized: Invalide email or password');
                }
            }
            login();    
        }else{
            if(!firstName){
                setError(!error);
                setErrorMessage('Please enter you first name');
            }else if(!lastName){
                setError(!error);
                setErrorMessage('Please enter you last name');
            }
            async function signup(){
                const message = await apiServices.Register(firstName, lastName, email, password);
                if(message == 'Signup successfully'){
                    navigate('/dashboard');
                }else{
                    setError(!error);
                }
            }
            signup();
        }
    }

    return (
        <>

            <h2>{singin ? "Register" : "Login"}</h2>
            {error && <h3>{errorMessage}</h3>}
            <form>
                {singin &&
                    <>
                        <input type="text" value={firstName} placeholder="First Name" onChange={e => setFirstName(e.target.value)} /> <br />
                        <input type="text" value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)} /> <br />
                    </>
                }
                <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} /> <br />
                <input type="text" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} /> <br />
                <button onClick={handleSubmit} >Submit</button>
            </form>
            <p onClick={() => setSignIn(!singin)} >{singin ? "Existing User Login" : "New user. Register"}</p>
        </>
    )
}