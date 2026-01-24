import { FC, useContext } from 'react';
import AceptacionAdmin from '../../components/AYC/AceptacionAdmin';

import { AuthContext } from '../../context/auth';
//Get the user session

const index: FC = (props) => {
  const { User } = useContext(AuthContext);

  if (User?.rol?.nombre === 'Administrador') {
    return <AceptacionAdmin />;
  }

  return <>index</>;
};

export default index;
