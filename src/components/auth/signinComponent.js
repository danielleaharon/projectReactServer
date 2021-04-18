import React from 'react';
import {signin,authenticate,isAuth} from '../../actions/auth';
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const SigninComponent=()=>{
 
    const [values,setValues]=useState({
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
    const {email,password,error,loading,message,showForm }= values;

    const handelSubmit = e =>{
        e.preventDefault();
        setValues({...values,loading:true,error:false})

        const user= {email,password}
        signin(user).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})

            }
            else{

                authenticate(data,()=>{ hi.go('/')})
               

            }
        });

    };
    const handelChange = name=>e=>{
        setValues({...values,error:false,[name]:e.target.value})
    };
    const showError=()=> error ? <div className="alert alert-danger"> {error}</div>:'';
    const showMessage=()=> message ? <div className="alert alert-info"> Loadibg...</div>:'';
    const showLoading=()=> loading ? <div className="alert alert-info"> {message}</div>:'';
    const signinFrom=()=>{
        return (
            <form onSubmit={handelSubmit}>
               

                <div className="form-group">
                    <input value={email} onChange={handelChange('email')} type="email" className="form-control" placeholder="Type your email"/>
                </div>

                <div className="form-group">
                    <input value={password} onChange={handelChange('password')} type="password" className="form-control" placeholder="Type your password"/>
                </div>

                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    };
    return (
        <React.Fragment>
          {showError()}
            {showLoading()}
            {showMessage()}
          {showForm && signinFrom()}       
           </React.Fragment>
        
        )
};
export default SigninComponent;