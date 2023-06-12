import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/alerta';
import clienteAxios from '../config/Axios';
const NuevoPass = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passModificado, setPassModificado] = useState(false);

  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: 'Ingresa tu nuevo password'
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error en el enlace',
          error: true
        });
      }
    };
    comprobarToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser mínimo 6 caracteres',
        error: true
      })
    };

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg
      });
      setPassModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu Password y no pierdas acceso a tus {""}
          <span className="text-black">Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <label className="uppercase text-gary-600 block text-xl font-bold">Nuevo Password</label>
              <input
                type="password"
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <input
                type="submit"
                value="Reestablecer Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

          </>
        )}
        {passModificado &&
          <Link to="/"
            className='block text-center my-5 text-gray-500'
          >Iniciar Sesion</Link>
        }

      </div>
    </>
  )
}

export default NuevoPass