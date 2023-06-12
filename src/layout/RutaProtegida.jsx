import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import Footer from '../components/Footer';
import Header from '../components/Header'

const RutaProtegida = () => {
  const { auth, cargando } = useContext(AuthProvider);

  if (cargando) {
    return 'Cargando...';
  }

  if (!auth._id) {
    // Si el usuario no está autenticado, redirigir al inicio de sesión
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <main className='container mx-auto mt-10'>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RutaProtegida;
