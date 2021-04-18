import fetch from 'isomorphic-fetch'
import coockie from 'js-cookie'
import { useHistory } from 'react-router-dom'

// const history=useHistory();
export const signout=(next)=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
    return fetch('http://localhost:8081/user/signout',{
        method: 'GET'
    })
    .then(response=>{
        console.log("sigout sucess")
    })
    .catch(err=>console.log(err));
}
export const signup= user =>{
    return fetch('http://localhost:8081/user/signup',{
        method: 'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
  
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};

export const signin= user =>{
    return fetch('http://localhost:8081/user/signin',{
        method: 'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
  
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    // .catch(err=>console.log(err));
};
export const setCookie=(key, value)=>{
    if(process.browser){
        coockie.set(key,value,{ expires:1})
    }
}
export const removeCookie=(key)=>{
    if(process.browser){
        coockie.remove(key,{ expires:1})
    }
}
export const getCookie=(key)=>{
    if(process.browser){
        return coockie.get(key);
    }
}
export const setLocalStorage=(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removeLocalStorage=(key)=>{
    if(process.browser){
        localStorage.removeItem(key);
    }
}
export const authenticate=(data,next)=>{
    setCookie('token',data.token);
    setLocalStorage('user',data.user);
    next();
}
export const isAuth=()=>{
    if(process.browser){
        const coockieChecked= getCookie('token');
        if(coockieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                return false;
            }
        }
    }
}