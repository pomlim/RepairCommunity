import Image from 'next/image';
import Link from 'next/link';
import shopService from '@/services/shop';
import opeTimeService from '@/services/opeTime';
import reviewTagService from '@/services/reviewTag';
import config from '@/config/index';
import Modal from '@/components/modal/modal';
import Review from '@/components/review';
import OpeTimeDetail from '@/components/detail/OpeTimeDetail';
const { apiBaseUrl } = config;

const ShopPresenter = ({ shop, reviews, opeTimes, reviewTags }) => {
  const { id } = shop;
  const { name, address_detail, latitude, longitude, shop_images } =
    shop.attributes;

  return (
    <>
      <Link href="/shops"> BACK</Link>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>{name}</div>
      <div>{address_detail}</div>
      <div>{latitude}</div>
      <div>{longitude}</div>
      <OpeTimeDetail ope={opeTimes}/>
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
