import axios from 'axios';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import api from "../Api/api"

function Register() {
    const [user, setUser] = useState({
        name: "",
        password: "",
    });
    useEffect(() => {
        const currectUser = localStorage.getItem("name");
        if(currectUser){
            router.push("/messages")
        }
    }, [])
    const [error, setError] = useState(null)
    const router = useRouter();
 const handleChange = (e) => {
    setError(null);
     setUser({...user, [e.target.id]: e.target.value})
 }
 const handleSubmit = async () => {
   let response =  await api.get("/users")
   response = response.data;
   let userDetail = {...user}
   let isExist = response.find(user => user.name == userDetail.name);
   if(isExist){
       setError("user already Exists");
   }
   else {
       const request = {id:response.length+1,...userDetail}
       let res = await api.post("/users",request);
       localStorage.setItem("name", userDetail.name)
       router.push("/messages")
   }
   
 }
  return (
    <div>
         <h4>REGISTER</h4>
       <label>username</label>
      <input type="text" onChange={handleChange} id="name"/>
      <label>password</label>
      <input type="text" onChange={handleChange} id="password"/>
      <button disabled={!user.name || !user.password} onClick={handleSubmit}>Register</button>
      {error && <div style={{ color: "red"}}>{error}</div>}
      <div onClick={() => router.push("/")} style={{ cursor: "pointer"}}>Login</div>
    </div>
  )
}

export default Register
