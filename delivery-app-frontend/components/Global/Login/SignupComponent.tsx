import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/images/dronelogo.svg'
import DroneSignup from '@/public/images/dronelogin.jpg'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, GeoPoint, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface SignUpProps {
  showSignup: (value: boolean) => void
}

const SignUp = ({ showSignup }: SignUpProps): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const auth = getAuth()

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const userId = userCredential.user.uid
      const userDocRef = doc(db, 'users', userId)
      await setDoc(userDocRef, { email })
      await setDoc(doc(collection(userDocRef, 'deliveries')), {
        address: '',
        departure: new Date(),
        from: new GeoPoint(0, 0),
        to: new GeoPoint(0, 0),
        price: 0,
        weight: 0,
      })
      await setDoc(doc(collection(userDocRef, 'notifications')), {
        description: '',
        title: '',
        type: 0,
      })
      showSignup(false)
    } catch (error:any) {
      console.error('Error creating user:', error)
      alert(error.message)
      return;
    }
  }

  return (
    <div>
      <div className="flex w-full max-w-6xl h-[80vh] shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2">
          <Image
            src={DroneSignup}
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
              CREATE YOUR ACCOUNT
            </h1>

            <form onSubmit={handleSignUp} className="space-y-6">
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
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="mt-1 block w-full p-3 border border-customGrey rounded-md shadow-sm text-customBlack"
                  placeholder="•••••••••••••"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-customBlack">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  className="mt-1 block w-full p-3 border border-customGrey rounded-md shadow-sm text-customBlack"
                  placeholder="•••••••••••••"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-customGreen text-customWhite py-3 px-4 rounded-md hover:bg-customLightGreen focus:outline-none focus:ring-2 focus:ring-customGreen focus:ring-offset-2">
                SIGN UP
              </button>
            </form>

            {/* Log In */}
            <div className="mt-6 text-center">
              <p className="text-sm text-customBlack">
                Already have an account?{' '}
                <a
                  onClick={() => {
                    showSignup(false)
                  }}
                  className="text-customGreen hover:text-customLightGreen font-medium">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
