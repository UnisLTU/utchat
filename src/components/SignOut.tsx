import React from 'react'
import { auth } from '../utchat'
import { signOut } from 'firebase/auth'

const SignOut = () => {
    const signOutAuth = () => signOut(auth) 
  return (
    <div><button onClick={signOutAuth}>Sign Out</button></div>
  )
}

export default SignOut