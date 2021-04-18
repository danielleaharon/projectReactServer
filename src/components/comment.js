import React from "react"

export default function Comment({content, username}) {    
        
    

    return (        
        <div >{username.name} : {content}</div>        
    );
}