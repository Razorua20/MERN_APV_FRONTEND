import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout.jsx'
import Login from './paginas/Login.jsx'
import Registrar from './paginas/Registrar.jsx'
import ConfirmarCuenta from './paginas/ConfirmarCuenta.jsx'
import OlvidePass from './paginas/OlvidePass.jsx'
import NuevoPass from './paginas/NuevoPass.jsx'
import EditarPerfil from './paginas/EditarPerfil.jsx'
import CambiarPassword from './paginas/CambiarPassword.jsx'

import RutaProtegida from './layout/RutaProtegida.jsx'
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx'

import { AuthProvider } from './context/AuthProvider.jsx'
import { PacientesProvider } from './context/PacientesProvider.jsx'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="Registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="OlvidePass" element={<OlvidePass />} />
              <Route path="OlvidePass/:token" element={<NuevoPass />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
