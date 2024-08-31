import React, { useState } from 'react';
import loginIcons from '../assets/login.png';
import {FaEye} from 'react-icons/fa';
import {FaEyeSlash} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPAssword] = useState(false);
  const [data, setData] = useState({
    email : "",
    password : "",
    name : "",
    confirmPassword : "",
    profilePic : "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) =>{
    const { name, value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)

    setData((prev)=>{
      return{
        ...prev,
        profilePic : imagePic
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryAPI.signUp.url,{
        method : SummaryAPI.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

    } else {
      console.log("Please check password and confirm password!")
    }

    

  }

  return (
    <section id='signup'>
      <div className='mx-auto container px-4 mt-8'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          
          <div className='w-40 h-30 mx-auto relative'>

            <div>
              <img src={data.profilePic || loginIcons} alt='login' />
            </div>
            <form>
              <label>
                <div className='text-xs text-center -mt-10 bg-slate-200 py-2 absolute bottom-0 w-full cursor-pointer rounded-full'>
                  Upload Profile Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
              </label>
            </form>

          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-100 p-2'>
                <input type='text' 
                placeholder='Enter your name' 
                name='name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input type='email' 
                placeholder='Enter email' 
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showPassword ? "text" : "password"} 
                placeholder='Enter password'
                name='password' 
                value={data.password}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>

                <div className='cursor-pointer text-xl ' onClick={()=>setShowPassword((prev)=>!prev)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash/>
                      )
                      :
                      (
                        <FaEye/>
                      )
                    }
                  </span>
                </div>
              </div>

            </div>

            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showConfirmPassword ? "text" : "password"} 
                placeholder='Enter Confirm Password'
                value={data.confirmPassword}
                name='confirmPassword' 
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>

                <div className='cursor-pointer text-xl ' onClick={()=>setShowConfirmPAssword((prev)=>!prev)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash/>
                      )
                      :
                      (
                        <FaEye/>
                      )
                    }
                  </span>
                </div>
              </div>

            </div>

            <button className='bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

          </form>

          <p className='my-5'>Already have account ? <Link to={"/login"} className='text-blue-600 hover:text-blue-900 hover:underline'>Login</Link></p>

        </div>
      </div>
    </section>
  )
}

export default SignUp