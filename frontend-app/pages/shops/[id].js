import Image from 'next/image';
import Link from 'next/link';
import shopService from '@/services/shop';
import opeTimeService from '@/services/opeTime';
import reviewTagService from '@/services/reviewTag';
import config from '@/config/index';
import Modal from '@/components/modal/modal';
import Review from '@/components/review';
const { apiBaseUrl } = config;

const ShopPresenter = ({ shop, reviews, opeTimes, reviewTags }) => {
  const { id } = shop;
  const { name, address_detail, latitude, longitude, shop_images } =
    shop.attributes;

  // const foundFri = opeTimes[0].filter
  // const foundFri = opeTimes.filter((opeTime) => opeTime.attributes.day === "mon")
  // opeTimes.filter((opeTime) => opeTime.day === "mon")

  // const foundFri = opeTimes.filter((opeTime) => opeTime.attributes.day === 'fri').map(({day, startTime, endTime}) => ({day, startTime, endTime}));
  const mon = opeTimes.find((e) => {
    return e.attributes.day === 'mon';
  });
  const sun = opeTimes.find((e) => {
    return e.attributes.day === 'sun';
  });
  const tue = opeTimes.find((e) => {
    return e.attributes.day === 'tue';
  });
  console.log(sun.attributes.day);

  return (
    <>
      <Link href="/shops"> BACK</Link>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>{name}</div>
      <div>{address_detail}</div>
      <div>{latitude}</div>
      <div>{longitude}</div>
      <div>{longitude}</div>
      <div>{mon.attributes.day}</div>
      <div>{mon.attributes.startTime}</div>
      <div>{mon.attributes.endTime}</div>
      <ui>
        {mon ? (
          <li>
            <div>{mon.attributes.day}</div>
            <div>{mon.attributes.startTime}</div>
            <div>{mon.attributes.endTime}</div>
          </li>
        ) : (
          ''
        )}
        {tue ? (
          <li>
            {tue.attributes.day}
            {tue.attributes.startTime}
            {tue.attributes.endTime}
          </li>
        ) : (
          ''
        )}
        {sun ? (
          <li>
            {sun.attributes.day}
            {sun.attributes.startTime}
            {sun.attributes.endTime}
          </li>
        ) : (
          ''
        )}
      </ui>
      {shop_images.data.map((shop_image, index) => {
        return (
          <Image
            key={index}
            loader={() => apiBaseUrl + shop_image.attributes.url}
            src={apiBaseUrl + shop_image.attributes.url}
            alt="/"
            width={100}
            height={100}
          />
        );
      })}
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}

      <Modal shopId={id} reviewTags={reviewTags} />
    </>
  );
};

const Page = ({ shop, reviews, opeTimes, reviewTags }) => {
  return (
    <>
      <ShopPresenter
        shop={shop}
        reviews={reviews}
        opeTimes={opeTimes}
        reviewTags={reviewTags}
      />
    </>
  );
};

Page.getInitialProps = async (context) => {
  const shopId = context.query.id;
  const shopResp = shopService.GetByID(shopId);
  const reviewsResp = shopService.GetReviewsByShopID(shopId);
  const opeTimeResp = opeTimeService.GetOpeTimeById(shopId);
  const reviewTagsResp = reviewTagService.GetAll();
  const [shop, reviews, opeTimes, reviewTags] = await Promise.all([
    shopResp,
    reviewsResp,
    opeTimeResp,
    reviewTagsResp
  ]);

  return {
    shop,
    reviews,
    opeTimes,
    reviewTags
  };
};

export default Page;
