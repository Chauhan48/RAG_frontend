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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!singin){
            async function login(){
                const message = await apiServices.Login(email, password);
                if(message == 'Login successfully'){
                    navigate('/dashboard')
                }else{
                    setError(!error);
                }
            }
            login();    
        }
        console.log(firstName, lastName)
    }

    return (
        <>

            <h2>{singin ? "Register" : "Login"}</h2>
            {error && <h3>{singin ? 'Internal server error. Try again after some time' : 'Unauthorized'}</h3>}
            <form>
                {singin &&
                    <>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} /> <br />
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} /> <br />
                    </>
                }
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} /> <br />
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} /> <br />
                <button onClick={handleSubmit} >Submit</button>
            </form>
            <p onClick={() => setSignIn(!singin)} >{singin ? "Existing User Login" : "New user. Register"}</p>
        </>
    )
}