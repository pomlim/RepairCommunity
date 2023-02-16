import React, { useState } from 'react';
import Image from 'next/image';

import {
  faCircleArrowLeft,
  faCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '@/config/index';
const { apiBaseUrl } = config;

const ShopImage = ({ shop_images }) => {
  const [current, setCurrent] = useState(0);
  const length = shop_images ? shop_images.length : 0;

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(shop_images) || shop_images.length <= 0) {
    return null;
  }

  return (
    <div className="relative flex justify-center p-4">
      {shop_images ? (
        shop_images.map((shop_image, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? 'opacity-[1] ease-in duration-1000 h-64 w-96'
                  : 'opacity-0'
              }
            >
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                onClick={prevImage}
                className="absolute top-[50%] ml-2 text-black cursor-pointer select-none z-[2]"
              />

              {index === current && (
                <Image
                  alt="Picture of the author"
                  // loader={() => apiBaseUrl + shop_image.attributes.url}
                  src={apiBaseUrl + shop_image.attributes.url}
                  // className="relative h-64 m-3 w-96"
                  height="300"
                  width="450"
                  // layout="fill" // required
                  objectFit="cover" // change to suit your needs
                  // unoptimized={true}
                  className="rounded-[8px]"
                />
              )}
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                onClick={nextImage}
                className="absolute top-[50%] mr-2 text-black cursor-pointer select-none z-[2]"
              />
            </div>
          );
        })
      ) : (
        <div className="relative h-64 m-3 w-96">
          <Image
            alt="Picture of the author"
            loader={() => apiBaseUrl + shop_image.attributes.url}
            src={'/default-shop.jpg'}
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            unoptimized={true}
            className="rounded-[8px]"
          />
        </div>
      )}
    </div>
  );
};

export default ShopImage;
