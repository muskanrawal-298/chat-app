import React, {useState, useEffect} from 'react'

function Messages({nextUser, sendMessage}) {
    const [currectUser, setCurrentUser] = useState("")
    useEffect(() => {
        setCurrentUser(localStorage.getItem("name"))
    },[])
  return (
    <div style={{  border: "2px solid black", display: "flex", justifyContent: "center", flexDirection: "column"}}>
       <div style={{  display: "flex", justifyContent: "space-between"}}>
       <h1 >{nextUser}</h1>
       <h1 >{currectUser}</h1>
       </div>
       <div>Hii</div>
       <br/>
       <div><input/><button onClick={sendMessage}>Send</button></div>
    </div>
  )
}

export default Messages
