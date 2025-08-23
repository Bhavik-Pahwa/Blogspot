import React from 'react'
import { Link } from 'react-router-dom'

function SignupForm() {
  return (
    <>
    	<div className="fixed w-full h-full top-0 left-0 bg-platinum z-[100] flex flex-col items-center !p-12">
			<h1 className="font-lambu text-5xl font-bold">Sign Up</h1>
			<form action="" method="post" className="w-4/5 flex flex-col items-center !mt-10 font-lato gap-4">
				<label htmlFor="email" className="flex flex-col w-3/5 gap-1">
					Name
					<input type="text" name="name" className="!p-3 bg-white rounded-md"/>
			  </label>
			  <label htmlFor="email" className="flex flex-col w-3/5 gap-1">
					Email Address
					<input type="email" name="email" className="!p-3 bg-white rounded-md"/>
			  </label>
              <label htmlFor="email" className="flex flex-col w-3/5 gap-1">
					Age
					<input type="number" name="age" className="!p-3 bg-white rounded-md"/>
			  </label>
              <label htmlFor="email" className="flex flex-col w-3/5 gap-1">
					Set Password
					<input type="password" name="password" className="!p-3 bg-white rounded-md"/>
			  </label>
			  <input type="submit" value="Register" className="font-bold text-xl !pl-5 !pr-5 !pt-2.5 !pb-2.5 bg-oxford_blue text-platinum rounded-4xl cursor-pointer shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"/>
			  <Link to="/login" className="hover:underline hover:decoration-1 cursor-pointer">Already Have an Account? Sign In</Link>
			</form>
			<Link to="/"><img src="/close.png" alt="" className='absolute z-50 top-5 right-5 w-10 h-10'/></Link>
			
		</div>
    </>
  )
}

export default SignupForm