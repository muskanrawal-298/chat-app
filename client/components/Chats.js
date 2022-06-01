
import { useRouter } from 'next/router'
import React, {useState,useEffect} from 'react'
import api from '../Api/api'
import Messages from './Messages'
import io from 'socket.io-client'
// import useChat from './useChat'

const socket = io('http://localhost:4001')


function Chats() {
    
    const [ user, setUser] = useState([])
    const [ nextUser, setNextUser] = useState("")
    const router = useRouter();
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', payload => {
            //console.log(">>>>", payload)
          setChat([...chat, payload])
        })
      })

    
    
      const sendMessage = async(e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem("name");
        let response =  await api.get("/users")
        response = response.data;
       
        const user = response.filter(item => item.name == nextUser)
        console.log("////", user)
        const index = user[0].id;
        if(user[0]["messages"]){
            if(user[0]["messages"][currentUser]){
                let temp = {"message": message, timeStamp: Date.now()}
                user[0]["messages"][currentUser].push(temp)
            }
            else{
                let temp = {"message": message, timeStamp: Date.now()}
                user[0]["messages"][currentUser] = []
            user[0]["messages"][currentUser].push(temp)
            }
            
        }
        else{
            user[0]["messages"] = {};
            let temp = {"message": message, timeStamp: Date.now()}
            user[0]["messages"][currentUser] = []
            user[0]["messages"][currentUser].push(temp)
        }
        console.log(">>>>>", currentUser, nextUser, user)
        const res = await api.put(`/users/${index}`,user[0])
        socket.emit('message',{message, currentUser})
        setMessage('')
      };

    useEffect(() => {
        const currentUser = localStorage.getItem("name");
        if(!currentUser){
            router.push("/")
        }
        else{
            handleChange();
        }
    }, [])

    const filterOldChats = async() => {
        const currentUser = localStorage.getItem("name");
        let response =  await api.get("/users")
        response = response.data;
        const userNext = response.filter(item => item.name == nextUser)
        const userCurrent = response.filter(item => item.name == currentUser)
        
        let currentMessages = [userNext["messages"] && userNext["messages"][currentUser], userCurrent["messages"] && userCurrent["messages"][nextUser]]
        console.log(".....<<<<<....>>>>", userNext, userCurrent, currentMessages)
       // setChat([...currentMessages])
    }

    useEffect(() => {
        if(nextUser!=""){
            filterOldChats();
        }

    }, [nextUser])

    const handleChange = async() => {
        let response =  await api.get("/users")
        response = response.data;
        const currentUser = localStorage.getItem("name");
        let tempData = response.filter(user => {
                return user.name.toLowerCase() != currentUser.toLowerCase()
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
     
      {nextUser && <Messages nextUser={nextUser} sendMessage={sendMessage} chat={chat} setMessage={setMessage} message={message}/>}
    </div>
  )
}

export default Chats
