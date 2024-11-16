import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';


const Login = () => {
    const [errorMessage, setErrorMessage]=useState('');
    const [success, setSuccess]=useState(false);
    const emailRef = useRef();

    const handleLogin=(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email,password)

        setErrorMessage('');
        setSuccess(false);

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user)
            if(!result.user.emailVerified)
            {
              setErrorMessage('Please verify your email address')
            }
            else{
              setSuccess(true);
            }
        })
        .catch(error=>{
            console.log('error',error)
            setErrorMessage('Check Your Email and Password')
        })
    }
    const handleForgetPassword =()=>{
      console.log('Get me eamil Address',emailRef.current.value);
      const email = emailRef.current.value;
      if(!email){
        console.log('Please provide valid email address')
      }
      else{
        sendPasswordResetEmail(auth,email)
         .then(()=>{
            alert('Reset email sent, Please check your email.')
         })
      }
    }

    return (
       
    
    <div className="card bg-base-100 mx-auto mt-10 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
        <h4 className="text-4xl mx-auto font-bold">Login now!</h4>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef}placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        {
            errorMessage && <p className='text-red-500 mx-auto'>{errorMessage}</p>
        }
        {
            success && <p className='text-green-500 mx-auto'>Go My Boy</p>
        }
        <p>New to This Website. <Link to="/signup">Sign Up</Link> </p>
      </form>
    </div>

    );
};

export default Login;