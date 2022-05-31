
import { useRouter } from 'next/router'
import React, {useState,useEffect} from 'react'
import api from '../Api/api'
import Messages from './Messages'
import io from 'socket.io-client'
// import useChat from './useChat'

const socket = io('http://localhost:4000')


function Chats() {
    
    const [ user, setUser] = useState([])
    const [ nextUser, setNextUser] = useState("")
    const router = useRouter();
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', payload => {
          setChat([...chat, payload])
        })
      })
    
      const sendMessage = (e) => {
        e.preventDefault();
        console.log("req:",message)
        socket.emit('message',{message})
        setMessage('')
      };

    useEffect(() => {
        const currectUser = localStorage.getItem("name");
        if(!currectUser){
            router.push("/")
        }
        else{
            handleChange();
        }
    }, [])
    const handleChange = async() => {
        let response =  await api.get("/users")
        response = response.data;
        const currectUser = localStorage.getItem("name");
        let tempData = response.filter(user => {
                return user.name.toLowerCase() != currectUser.toLowerCase()
              }
        )
        setUser([...tempData])
    }

    const handleLogout = () => {
        localStorage.removeItem("name");
        router.push("/")
    }

    const handleChats = (name) => {
        setNextUser(name)
    }
  return (
    <div>
    
      <div>{user.map((item) => {
          return(
              <div onClick={() => handleChats(item.name)} style={{ cursor: "pointer"}}>{item.name}</div>
          )
      })}</div>
      <button onClick={handleLogout} style={{ position: "absolute", right: 0}}>Logout</button>
      <br/><br/><br/>
     
      {nextUser && <Messages nextUser={nextUser} sendMessage={sendMessage}/>}
    </div>
  )
}

export default Chats
