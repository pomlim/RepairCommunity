import Image from 'next/image';
// import Link from 'next/link';
import Landing_img from '@/public/landing-img.png';
import Reviv_logo from '@/public/Reviv_logo_landing.png';

const LandingPage = ({}) => {
  const url = `/shops`;
  return (
    <div className="w-full p-4 bg-butter-default ">
      <div className="pt-5 p-4 text-center">
        <div>
          <Image src={Reviv_logo} width={40} height={60} />
        </div>
        <div className="pt-4">
          <Image src={Landing_img} width={310} height={310} />
        </div>
        <div className="my-4 text-xs font-normal text-brown-default font-kanit">
          <p>แพลตฟอร์มรวบรวมร้าน (ช่าง) ซ่อมเสื้อผ้า</p>
          <p>จากทั่วกรุงเทพให้คุณได้ค้นพบร้าน local ใหม่ๆ</p>
          <p>ละแวกใกล้คุณ เลือกร้านที่ตรงใจได้ตามระยะทาง,</p>
          <p>บริการและรีวิวจากเพื่อนๆในคอมมูนิตี้</p>
          <p>ไม่ว่าจะตัดขาหรือซ่อมรูขาด ร้านใกล้บ้าน</p>
          <p>หรือใกล้ที่ทำงานก็หาได้ที่ Repair Market</p>
        </div>
        <div className="flex justify-center w-full pt-10 pb-8">
          <a href={url}>
            <button
              type="button"
              className="h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
            >
              เริ่มเลย
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
