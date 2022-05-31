import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import api from "../Api/api"


function Login() {
    const [user, setUser] = useState({
        name: "",
        password: "",
    })
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
       if(userDetail.password != isExist.password){
        setError("incorrect username or password");
       }
       else{
           localStorage.setItem("name", userDetail.name)
        router.push("/messages")
       }
    
   }
   else {
    setError("user does not exist");
      
   }
   
 }
  return (
    <div>
        <h4>LOGIN</h4>
        <label>username</label>
      <input type="text" onChange={handleChange} id="name"/>
      <label>password</label>
      <input type="text" onChange={handleChange} id="password"/>
      <button disabled={!user.name || !user.password} onClick={handleSubmit}>Login</button>
      {error && <div style={{ color: "red"}}>{error}</div>}
      <div onClick={() => router.push("/register")} style={{ cursor: "pointer"}}>Not Registered Yet? Click Here</div>
    </div>
  )
}

export default Login
