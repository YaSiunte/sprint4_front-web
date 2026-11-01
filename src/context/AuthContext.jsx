import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    localStorage.getItem('nextwave-user'),
  )

  const value = useMemo(
    () => ({
      user,
      login(name) {
        const cleanName = name.trim() || 'Estudante'
        localStorage.setItem('nextwave-user', cleanName)
        setUser(cleanName)
      },
      logout() {
        localStorage.removeItem('nextwave-user')
        setUser(null)
      },
    }),
    [user],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}