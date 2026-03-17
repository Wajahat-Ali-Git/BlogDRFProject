import { useState } from "react";
export const Signup = () => {
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")

    return(
        <>
            <label style={{}} >Enter your EMAIL</label>
            <input className=""  type="text" value={Email} onChange={(e)=>setEmail(e.target.value)} />
            <label >Enter your Password</label>
            <input className="" type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
            <label >Enter your Password again</label>
            <input className="" type="text" />
        </>
    );
}