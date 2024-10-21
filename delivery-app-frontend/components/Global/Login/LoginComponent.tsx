import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/images/dronelogo.svg'
import DroneLogin from '@/public/images/dronelogin.jpg'

interface LoginProps {
  showSignup: (value: boolean) => void
}

const Login = ({ showSignup }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault()
    console.log('Logging in with', { email, password, rememberMe })
  }

  return (
    <div>
      <div className="flex w-full max-w-6xl h-[80vh] shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2">
          <Image
            src={DroneLogin}
            alt="Drone flying"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
          <div className="max-w-md mx-auto">
            <div className="flex justify-start mb-8">
              <Image src={Logo} alt="Logo" className="h-20 " />
            </div>

            <h1 className="text-header3 font-bold text-center mb-6 text-customBlack">
              LOG IN TO YOUR ACCOUNT
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-customBlack">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  className="mt-1 block w-full p-3 border border-customGrey rounded-md shadow-sm text-customBlack"
                  placeholder="mail@abc.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-customBlack">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  className="mt-1 block w-full p-3 border border-customGrey rounded-md shadow-sm text-customBlack"
                  placeholder="•••••••••••••"
                  required
                />
              </div>

              {/* Remember Me/Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => { setRememberMe(!rememberMe) }}
                    className="h-4 w-4 text-customGreen focus:ring-customGreen border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-customBlack">
                    Remember Me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-customGreen hover:text-customLightGreen">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-customGreen text-customWhite py-3 px-4 rounded-md hover:bg-customLightGreen focus:outline-none focus:ring-2 focus:ring-customGreen focus:ring-offset-2">
                LOG IN
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-customBlack">
                Not Registered Yet?{' '}
                <a
                onClick={() => { showSignup(true) }}
                  className="text-customGreen hover:text-customLightGreen font-medium">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
