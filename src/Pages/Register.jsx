import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleSignIn from '../Provider/GoogleSignIn';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ShowHidePassword from '../Component/ShowHidePassword';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';


const onSubmit = async (data) => {
  setError('');
  try {
    // Create user
    const result = await createUser(data.email, data.password);
    const createdUser = result.user;
    console.log(createdUser);

    // ✅ Update user profile (name & photo)
    await updateUser({
      displayName: data.name,
      photoURL: data.photoURL,
    });

    // ✅ Save user in backend database
    const userData = {
      name: data.name,
      email: data.email,
      photoURL: data.photoURL,
      role: 'user', // You can change this logic
    };
    await axios.post('https://chatter-box-server-three.vercel.app/users', userData);

    toast.success('Registration Successful!');
    navigate(from);
  } catch (err) {
    setError(err.code || err.message || 'Registration failed');
  }
};


  return (
    <div className="card bg-white w-full mx-auto my-20 max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h1 className="text-3xl text-center text-accent font-bold">Register</h1>
        <fieldset className="fieldset">

          <label className="label">Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            className="input"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-600">Name is required.</p>}

          <label className="label">Photo URL</label>
          <input
            {...register('photoURL', { required: true })}
            type="text"
            className="input"
            placeholder="https://your-photo-url"
          />
          {errors.photoURL && <p className="text-red-600">Photo URL is required.</p>}

          <label className="label">Email</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-600">Valid email is required.</p>}

          <ShowHidePassword register={register} errors={errors} />

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button type="submit" className="btn btn-primary hover:btn-secondary mt-4">Register</button>

          <p className="text-center font-bold my-2 text-primary">OR</p>

          <GoogleSignIn />

          <p className="mt-3">
            Already have an account?{' '}
            <Link className="text-primary font-semibold hover:text-secondary" to={'/auth/login'}>
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
