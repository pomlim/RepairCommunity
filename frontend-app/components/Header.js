import Image from 'next/image';
import Reviv_logo from '@/public/Reviv_logo_header.jpg';

const Header = () => {
  return (
    <div className="p-4 flex w-full h-[48px] bg-green-default items-center drop-shadow-lg">
      <nav>
        <Image
          src={Reviv_logo}
          width={50}
          height={50}
        />
      </nav>
    </div>
  );
};
export default Header;
