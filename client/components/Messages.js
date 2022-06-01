import React, {useState, useEffect} from 'react'

function Messages({nextUser, sendMessage, chat, setMessage, message}) {
    const [currentUser, setCurrentUser] = useState("")
    const [chats, setChats] = useState([...chat])
    const sortChatBasedOnTime = () => {
      let tempChat = [...chat]
      tempChat.sort((a,b) => a.timeStamp < b.timeStamp)
      setChats([...tempChat])
    }

    useEffect(() => {
        setCurrentUser(localStorage.getItem("name"))
        sortChatBasedOnTime();
    },[])

  return (
    <div style={{  border: "2px solid black", display: "flex", justifyContent: "center", flexDirection: "column"}}>
       <div style={{  display: "flex", justifyContent: "space-between"}}>
       <h1 >{nextUser}</h1>
       <h1 >{currentUser}</h1>
       </div>
       <div>{chat.map((item) => {
         return(
           <div>{item.currentUser}:{" "}{item.message}</div>
         )
       })}</div>
       <br/>
       <div><input type="text" name="message"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}/><button onClick={sendMessage}>Send</button></div>
    </div>
  )
}

export default Messages
