import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Signup = () => {

    const [success, setSuccess] = useState(false);

    const [errorMessege, setErrorMessege] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name=event.target.name.value;
        const photo=event.target.photo.value;
        const terms = event.target.terms.checked;
        console.log(email,password,name,photo,terms);
        if(!terms)
        {
            setErrorMessege('Accept the Terms and Conditions');
            return;
        }

        setErrorMessege('');
        setSuccess(false);
        

        if (password.length < 6) {
            setErrorMessege('length must be up to 6');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessege('one upper, one lower, one special, one number, understood ^_^');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('Varification Email Sent.')
                });

                const profile={
                    displayName:name,
                    photoURL:photo
                }
                updateProfile(auth.currentUser,profile)
                .then(()=>{
                    console.log('User profile update')
                })
                .catch(error=>console.log('User Profile update Error'))
            })
            .catch(error => {
                console.log('error', error.message)
                setErrorMessege(error.message);
            })

    }
    return (

        <div className="card mx-auto my-10  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h2 className="text-5xl mx-auto  mt-5 font-bold">Sign Up now!</h2>
            <form onSubmit={handleSignUp} className="card-body ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs absolute right-5 top-12'>
                        {
                            showPassword ? <FaEyeSlash ></FaEyeSlash> : <FaEye></FaEye>
                        }

                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    <div className="form-control">
                        <label className="label cursor-pointer flex justify-start">
                        <input  type="checkbox" name='terms' className="checkbox" />
                            <span className="ml-3 label-text">Accept Our Terms And Conditions</span>
                            
                        </label>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button  className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessege && <p className='text-red-500  mb-7 text-center'>{errorMessege}</p>
            }
            {
                success && <p className='text-green-500  mb-7 text-center'>You have Done My Boy</p>
            }
            
            <p className='text mb-3 ml-7'>Old member?  <Link to="/login">Log In</Link>  </p>
        </div>

    );
};

export default Signup;