import { Outlet } from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>

      {/* Espacio reservado para las otras routes */}
      <main className="container mx-auto md:grid md:grid-cols-2 mt-10 gap-12 p-5 items-center">
        <Outlet />

      </main>
    </>

  )
}

export default AuthLayout