import _ from 'lodash';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import shopService from '@/services/shop';
import reviewTagService from '@/services/reviewTag';
import config from '@/config/index';
import Modal from '@/components/modal/modal';
import Review from '@/components/review';
import OpeTimeDetail from '@/components/detail/OpeTimeDetail';
import PageLayout from '@/components/PageLayout';
import MapDetail from '@/components/MapDetail';

import {
  faClock,
  faWallet,
  faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { apiBaseUrl } = config;

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
    contracts,
    payments
  } = shop.attributes;
  return (
    <>
      <PageLayout>
        {/* <Link href="/shops"> BACK</Link>s */}
        <p className="text-2xl font-bold">{name}</p>
        {shop_images.data
          ? shop_images.data.map((shop_image, index) => {
              return (
                <div key={index} className="relative h-64 m-3 w-96">
                  <Image
                    alt="Picture of the author"
                    loader={() => apiBaseUrl + shop_image.attributes.url}
                    src={apiBaseUrl + shop_image.attributes.url}
                    layout="fill" // required
                    objectFit="cover" // change to suit your needs
                    unoptimized={true}
                    className="rounded-[8px]"
                  />
                </div>
              );
            })
          : ''}

        <button className="m-3 border-solid rounded-full btn w-60 btn-primary">
          โทร
        </button>
        {/* contracts.phone */}
        <button className="m-3 border-solid rounded-full btn w-60 btn-outline">
          นำทาง
        </button>
        <div className="p-3 m-3 card">
          <MapDetail lat={latitude} lng={longitude}/>
        </div>
        <div className="p-3 m-3 card">
          {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
          <p className="text-base font-bold text-gray-700">{address_detail}</p>
        </div>
        <div className="grid gap-6 p-3 m-3 divide-y card divide-dashed">
          <div>
            <FontAwesomeIcon icon={faClock} />
            <OpeTimeDetail ope={shop.attributes.shop_operating_times.data} />
          </div>
          <div>
            <p className="font-bold text-primary-content">
              ประเภทการซ่อมที่เชี่ยวชาญ
            </p>
            <div className="flex flex-wrap flex-row">
              {shop_repair_tag_links
                ? shop_repair_tag_links.data.map(
                    (shop_repair_tag_link, index) => {
                      const name =
                        shop_repair_tag_link.attributes.repair_tag.data
                          .attributes.name;
                      return (
                        <div
                          key={index}
                          className="mr-3 mt-3 p-1 border-[1px] border-primary-content rounded font-bold"
                        >
                          {name}
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </div>
          <div>
            <p className="font-bold text-primary-content">ช่องทางติดต่อ</p>
            {contracts.facebook !== '' ? (
              <FontAwesomeIcon icon={faFacebook} />
            ) : null}
            {contracts.line !== '' ? <FontAwesomeIcon icon={faLine} /> : null}
          </div>
          <div>
            <p className="font-bold text-primary-content">วิธีชำระค่าบริการ</p>
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
        <button
          onClick={onReview}
          className="m-3 border-solid rounded-full btn w-60 btn-primary"
        >
          ให้คะแนนและรีวิวร้านนี้
        </button>
        <br />
        <div className="mt-3 p-4">
          <p className="font-bold text-secondary-content">รีวิวจากผู้ใช้งาน</p>
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
