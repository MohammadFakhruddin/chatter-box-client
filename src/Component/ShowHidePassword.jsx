import React, { useState } from 'react';

const ShowHidePassword = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="label">Password</label>
      <input
        {...register('password', { required: true })}
        type={showPassword ? 'text' : 'password'}
        className="input"
        placeholder="Password"
      />
      {errors.password && <p className="text-xs text-error">Password is required.</p>}
      <button
        type="button"
        className="text-sm text-blue-600 mt-1"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? 'Hide' : 'Show'} Password
      </button>
    </>
  );
};

export default ShowHidePassword;
