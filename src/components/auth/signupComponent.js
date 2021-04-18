import React from 'react';
import {signup,isAuth} from '../../actions/auth';
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';

const SignupComponent=()=>{
    const [values,setValues]=useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true

    });
    const hi =useHistory();

    useEffect(()=>{
        isAuth()&& hi.goBack('/')
     
    },[])
    const {name,email,password,error,loading,message,showForm }= values;

    const handelSubmit = e =>{
    
        e.preventDefault();

        setValues({...values,loading:true,error:false})

        const user= {name,email,password}
        signup(user).then(data=>{
            console.log("message"+data.message)
            if(data.error){
                setValues({...values,error:data.error})

            }
            else{
                setValues({...values,name:'',email:'',password:'',error:'',loading:false,message:data.message,showForm:false})
                hi.goBack('/')
            }
        });


    };
    const handelChange = name=>e=>{
        setValues({...values,error:false,[name]:e.target.value})
    };
    const showError=()=> error ? <div className="alert alert-danger"> {error}</div>:'';
    const showMessage=()=> message ? <div className="alert alert-info"> Loadibg...</div>:'';
    const showLoading=()=> loading ? <div className="alert alert-info"> {message}</div>:'';
    const signupFrom=()=>{
        return (
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handelChange('name')} type="text" className="form-control" placeholder="Type your name"/>
                </div>

                <div className="form-group">
                    <input value={email} onChange={handelChange('email')} type="email" className="form-control" placeholder="Type your email"/>
                </div>

                <div className="form-group">
                    <input value={password} onChange={handelChange('password')} type="password" className="form-control" placeholder="Type your password"/>
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    };
    return (
        <React.Fragment>
        
            {showError()}
            {showLoading()}
            {showMessage()}
          {showForm && signupFrom()}
        </React.Fragment>
        
        )
};
export default SignupComponent;