import React, { createContext, useContext, useState, useEffect } from 'react'
import { login } from '../api/auth.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loggedIn, setLoggedIn] = useState(!!token)

  const performLogin = async (email, password) => {
    const data = await login({ email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ token, loggedIn, performLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)