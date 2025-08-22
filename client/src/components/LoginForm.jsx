import React from 'react'

function LoginForm() {
  return (
    <div className='bg-linear-to-b from-black to-oxford_blue w-full h-screen flex flex-col justify-center items-center gap-10'>
        <div className='text-white font-lambu text-6xl w-full flex items-center justify-center'>Welcome!</div>
        <div className='flex justify-around items-center flex-row text-oxford_blue w-full font-lato font-semibold h-1/2'>
            <div className='flex flex-col w-1/3 bg-platinum items-center rounded-md h-full !p-2.5'>
                <h3 className='flex w-full justify-center font-oswald text-3xl !mb-2.5'>Login</h3>
                <form action="" method="post" className='flex w-full flex-col text-xl h-full justify-around'>
                    <label htmlFor="Email" className='w-full flex justify-between items-center'>
                        Email <input type="email" name="Email" id="" className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <label htmlFor="Age" className='w-full flex justify-between items-center'>
                        Password <input type='password' name='Password' id='' className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <input type="submit" value="Login" className='border-2 border-oxford_blue bg-transparent rounded-xl hover:bg-oxford_blue hover:text-orange_web transition-all duration-300 ease-in-out'/>
                </form>
            </div>
            <div className='flex flex-col w-1/3 bg-transparent items-center rounded-md h-full !p-2.5 border-2 border-orange_web text-white'>
                <h3 className='flex w-full justify-center font-oswald text-3xl !mb-2.5'>Sign Up</h3>
                <form action="" method="post" className='flex w-full flex-col text-xl h-full justify-around'>
                    <label htmlFor="Name" className='w-full flex justify-between items-center'>
                        Name <input type="text" name="Name" id="" className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <label htmlFor="Email" className='w-full flex justify-between items-center'>
                        Email <input type="email" name="Email" id="" className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <label htmlFor="Age" className='w-full flex justify-between items-center'>
                        Age <input type='number' name='Age' id='' className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <label htmlFor="Age" className='w-full flex justify-between items-center'>
                        Set Password <input type='password' name='Password' id='' className='text-[15px] font-medium border-b-2 outline-0'/>
                    </label>
                    <input type="submit" value="Sign Up" className='border-2 border-orange_web bg-transparent rounded-xl hover:bg-orange_web hover:text-oxford_blue transition-all duration-300 ease-in-out'/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginForm