import _ from 'lodash';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import shopService from '@/services/shop';
import reviewTagService from '@/services/reviewTag';
import Modal from '@/components/modal/modal';
import Review from '@/components/review';
import OpeTimeDetail from '@/components/detail/OpeTimeDetail';
import PageLayout from '@/components/PageLayout';
import MapDetail from '@/components/MapDetail';

import Contact from '@/components/shopDetail/contact';
import ShopImage from '@/components/shopDetail/shopImage';

import {
  faClock,
  faWallet,
  faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShopPresenter = ({ shop, reviews, reviewTags }) => {
  const [modal, setModal] = useState(false);

  const onReview = () => {
    setModal(true);
  };
  const modalClick = (open) => {
    setModal(open);
    if (!open) {
      // FIXME: get updated reviews
    }
  };

  const { id } = shop;
  const {
    name,
    address_detail,
    latitude,
    longitude,
    shop_images,
    shop_repair_tag_links,
    // contacts,
    payments,
    google_map_url
  } = shop.attributes;

  const contacts = {
    data: {
      phone: ['0867722033', '0806187311'],
      line: ['@benjamastailor', ['order1991']],
      facebook: ['https://www.facebook.com/BenjamasTailor/'],
      email: ['benjamas2519@gmail.com'],
      instagram: ['https://www.instagram.com/benjamastailor/'],
      webpage: ['http://www.benjamastailor.com/']
    }
  };

  const phones = contacts.data.phone?.length > 0 ? contacts.data.phone : null;

  return (
    <>
      <PageLayout>
        {/* <Link href="/shops"> BACK</Link>s */}
        <div className="w-full h-full p-4 bg-butter-default ">
          <p className="m-3 text-2xl text-brick font-medium font-kanit">
            {name}
          </p>
          <ShopImage shop_images={shop_images.data} />
          <a href={`tel:${phones[0]}`}>
            <button
              disabled={!phones}
              className="m-3 placeholder-brown-light border-2 border-brown-light focus:outline-none focus:border-brown-default text-brown-default rounded-full btn w-36 h-12 btn-outline bg-green-default text-base font-kanit"
            >
              โทร
            </button>
          </a>
          <a href={google_map_url}>
            <button className="m-3 border-solid border-2 border-green-default focus:outline-none focus:border-brown-default text-brown-default rounded-full w-36 h-12 bg-butter-default text-base font-kanit">
              นำทาง
            </button>
          </a>
          {/* <div className="p-3 m-3 card"> */}
          <MapDetail lat={latitude} lng={longitude} />
          {/* </div> */}
          {/* <div className="p-3 m-3 card"> */}
          <div>
            {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
            <p className="rounded-lg w-80 bg-butter-light text-xs text-center text-brown-default font-medium font-kanit">
              {address_detail}
            </p>
          </div>
          <div className="rounded-lg w-96 bg-butter-light">
            <div className="grid gap-6 p-3 m-3 divide-y card divide-dashed">
              <div>
                <FontAwesomeIcon icon={faClock} />
                <OpeTimeDetail
                  ope={shop.attributes.shop_operating_times.data}
                />
              </div>
              <div>
                <p className="font-bold text-xs text-brown-default font-medium font-kanit">
                  ประเภทการซ่อมที่เชี่ยวชาญ
                </p>
                <div className="flex flex-row flex-wrap">
                  {shop_repair_tag_links
                    ? shop_repair_tag_links.data.map(
                        (shop_repair_tag_link, index) => {
                          const name =
                            shop_repair_tag_link.attributes.repair_tag.data
                              .attributes.name;
                          return (
                            <div
                              key={index}
                              className="mr-3 mt-3 p-1 border-[1px] border-primary-content rounded text-brown-mid text-base font-kanit font-normal"
                            >
                              {name}
                            </div>
                          );
                        }
                      )
                    : null}
                </div>
              </div>
              <Contact contact={contacts.data} />
              <div>
                {/* <p className="font-bold text-primary-content"> */}
                <p className="font-bold text-xs text-brown-default font-medium font-kanit">
                  วิธีชำระค่าบริการ:
                </p>
                {payments.payments.map((payment, index) => {
                  if (payment === 'cash') {
                    return <FontAwesomeIcon key={index} icon={faWallet} />;
                  } else if (payment === 'online') {
                    return (
                      <FontAwesomeIcon key={index} icon={faMoneyBillTransfer} />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
          <button
            onClick={onReview}
            className="m-3 rounded-full btn w-80 h-12 btn-primary bg-green-default text-base text-brown-default font-normal font-kanit"
          >
            ให้คะแนนและรีวิวร้านนี้
          </button>
          <br />
          <div className="p-4 mt-3">
            <p className="font-bold text-secondary-content text-brown-mid text-xs font-medium font-kanit">
              รีวิวจากผู้ใช้งาน
            </p>
            <div className="divide-y divide-dashed divide-primary">
              {_.orderBy(
                reviews,
                [(review) => review.attributes.createdAt],
                ['desc']
              ).map((review, index) => (
                <div key={index} className="pt-4 pb-4">
                  <Review review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
      {modal && (
        <Modal shopId={id} reviewTags={reviewTags} setModal={modalClick} />
      )}
    </>
  );
};

const Page = ({ shop, reviews, reviewTags }) => {
  return (
    <>
      <ShopPresenter shop={shop} reviews={reviews} reviewTags={reviewTags} />
    </>
  );
};

Page.getInitialProps = async (context) => {
  const shopId = context.query.id;
  const shopResp = shopService.GetByID(shopId);
  const reviewsResp = shopService.GetReviewsByShopID(shopId);
  const reviewTagsResp = reviewTagService.GetAll();
  const [shop, reviews, reviewTags] = await Promise.all([
    shopResp,
    reviewsResp,
    reviewTagsResp
  ]);

  return {
    shop,
    reviews,
    reviewTags
  };
};

export default Page;
