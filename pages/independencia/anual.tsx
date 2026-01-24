import { FC, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import IndependenciaAdmin from '../../components/Independencia/IndependenciaAdmin';
import IndependenciaUsuario from '../../components/Independencia/IndependenciaUsuario';
const Independencias: FC = (props) => {
  const { User } = useContext(AuthContext);
  if (User?.rol?.nombre === 'Administrador') {
    return <IndependenciaAdmin />;
  }
  return (
    <>
      <IndependenciaUsuario />
    </>
  );
};

export default Independencias;
