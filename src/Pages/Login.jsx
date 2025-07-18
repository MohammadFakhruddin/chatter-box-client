import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleSignIn from '../Provider/GoogleSignIn';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ShowHidePassword from '../Component/ShowHidePassword';
import { AuthContext } from '../Provider/AuthContext';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    setError('');
    try {
      const result = await signIn(data.email, data.password);
      console.log(result);
      toast.success('Login Successful!');
      navigate(from);
    } catch (err) {
      setError(err.code || err.message || 'Login failed');
    }
  };

  return (
    <div className="card bg-white w-full mx-auto my-20 max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h1 className="text-3xl text-center text-accent font-bold">Login now!</h1>
        <fieldset className="fieldset">

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

          <button type="submit" className="btn btn-primary hover:btn-secondary mt-4">Login</button>

          <p className="text-center font-bold my-2 text-primary">OR</p>

          <GoogleSignIn />

          <p className="mt-3">Don't have an account? <Link className="text-primary font-semibold hover:text-secondary" to={'/auth/register'}>Sign Up</Link></p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
