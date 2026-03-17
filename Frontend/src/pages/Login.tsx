//import {react} from "react"
import { useState } from "react";

function Login (){
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [message,setMessage] = useState("")

    const handleLogin = async () =>{
        try{
            const res = await fetch("http://localhost:8000/auth/")
            const data = await res.json()
            setMessage(data.message)
        }
        catch(error){
            console.error("error:",error)
        }
        
    }

    
    return(<>
    <div style={{}}>

        
    <label style={{}} >Enter your Email</label>
    <input className=""  type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} />
    <label >Enter your Password</label>
    <input className="" type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={()=>handleLogin()}>Fetch Message</button>
    </div>

    <p>{Email} and {Password}</p>
    <p>{message}</p>
    
    </>);
}
export default Login;
 