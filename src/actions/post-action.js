import fetch from 'isomorphic-fetch'
import React from "react";

export const CountCategory = comps =>{
   return fetch('http://localhost:8081/posts/Category')
    .then(response => response.json()).then(
        data => {
            if (data.status == "success") {

    
                Array.from(data.data.results).map((entry) => {
                    Array.from(entry)
                    comps.push(entry)
                })
                return comps

            }
            else {
                console.log("database fail");
                return null;
            }
        }

    )
}





