import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Galeria from './pages/Galeria.jsx'
import Equipe from './pages/Equipe.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import CameraApp from './pages/CameraApp.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />

          <div className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/entrar" element={<Login />} />
              <Route
                path="/app"
                element={
                  <PrivateRoute>
                    <CameraApp />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App