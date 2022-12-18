import Image from 'next/image';
import logo from '../../public/images/KRESTON-CSM-LOGO.png';

const Brand = () => {
  return (
    <div style={{ marginTop: '15px', maxWidth: 200 }}>
      <Image
        priority
        // src="/images/logo.png"
        src={logo}
        alt="Logo"
        // width={150}
        // height={100}
      />
      {/* <Text>Kreston CSM</Text> */}
    </div>
  );
};

export default Brand;
