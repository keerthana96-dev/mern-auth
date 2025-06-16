// import { useState,useEffect, useRef, useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const ResetPassword = () => {

//   const {backendUrl} = useContext(AppContext)
//   axios.defaults.withCredentials = true

// const navigate = useNavigate()
// const [email, setEmail] = useState('')
// const [newPassword, setNewPassword] = useState('')
// const [isEmailSent, setIsEmailSent] = useState('')
// const [otp, setOtp] = useState(0)
// const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)


// const inputRefs = useRef([]);

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const paste = e.clipboardData.getData('text').slice(0, 6);
//     const pasteArray = paste.split('');
//     pasteArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//   };

// const onSubmitEmail = async (e )=>{
// e.preventDefault();
// try{
// const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
// data.success ? toast.success(data.message) :  toast.error(data.message)
// data.success && setIsEmailSent(true)
// } catch(error){
// toast.error(error.message)
// }
// }

// const onSubmitOtp = async (e) =>{
//   e.preventDefault();
//   const otpArray = inputRefs.current.map(e => e.value)
// setOtp(otpArray.join(''))
// setIsOtpSubmitted(true)
// }

// const  onSubmitNewPassword = async (e) =>{
//   e.preventDefault();
//   try{
//     const {data} =await axios.post(backendUrl + '/api/auth/reset-password' , {email,otp, newPassword})
//     data.success ? toast.success(data.message) : toast.error(data.message)
//     data.success && navigate('/login')
//   } catch(error){
//     toast.error(error.message)
//   }

// }




//   return (
//     <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
//      <img
//              onClick={() => navigate('/')}
//              src={assets.logo}
//              alt=""
//              className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
//            />

// {!isEmailSent && 


// <form  onSubmit={onSubmitEmail} className='bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm'>

// <h1 className="text-white text-2xl font-semibold text-center mb-4">
//           Reset Password </h1>
//         <p className="text-center mb-6 text-indigo-200">
//           Enter your registered email address.
//         </p>


// <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
// <img src={assets.mail_icon} alt='' className='w-3 h-3'/>
// <input type='email' placeholder='Email id'  className='bg-transparent outline-none text-gray-200' value={email} onChange = {e => setEmail(e.target.value)} required/>
// </div>

// <button className='w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full mt-3'> Submit</button>

// </form>
// }

// {!isOtpSubmitted && isEmailSent &&

// <form onSubmit={onSubmitOtp}
        
//         className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
//       >
//         <h1 className="text-white text-2xl font-semibold text-center mb-4">
//           Reset Password OTP
//         </h1>
//         <p className="text-center mb-6 text-indigo-300">
//           Enter the 6-digit code sent to your email id.
//         </p>

//         <div className="flex justify-between mb-9" onPaste={handlePaste}>
//           {Array(6)
//             .fill(0)
//             .map((_, index) => (
//               <input
//                 type="text"
//                 maxLength="1"
//                 key={index}
//                 required
//                 className="w-12 h-12 bg-gray-600 text-gray-200 text-center text-xl rounded-md"
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 onInput={(e) => handleInput(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//               />
//             ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full"
//         >
//           Verify email
//         </button>
//       </form>
// }



// {isOtpSubmitted && isEmailSent &&

// <form onSubmit={onSubmitNewPassword} className='bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm'>

// <h1 className="text-white text-2xl font-semibold text-center mb-4">
//           New password </h1>
//         <p className="text-center mb-6 text-indigo-200">
//           Enter the new password below .
//         </p>


// <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700'>
// <img src={assets.lock_icon} alt='' className='w-3 h-3'/>
// <input type='password' placeholder='password'  className='bg-transparent outline-none text-gray-200' value={newPassword} onChange = {e => setNewPassword(e.target.value)} required/>
// </div>

// <button className='w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full mt-3'> Submit</button>

// </form>

// }

//     </div>
//   )
// }

// export default ResetPassword






import { useState, useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((el) => el.value).join('');
    if (otpValue.length !== 6) return toast.error("Please enter a 6-digit OTP");
    setOtp(otpValue);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Email Entry Form */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-indigo-200">Enter your registered email address.</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-gray-200 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full mt-3"
          >
            Submit
          </button>
        </form>
      )}

      {/* OTP Entry Form */}
      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>

          <div className="flex justify-between mb-9" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="w-12 h-12 bg-gray-600 text-gray-200 text-center text-xl rounded-md"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* New Password Entry Form */}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-indigo-200">
            Enter your new password below.
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700">
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input
              type="password"
              placeholder="New password"
              className="bg-transparent outline-none text-gray-200 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full mt-3"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
