import Image from 'next/image';
import Link from 'next/link';
import shopService from '@/services/shop';
import reviewTagService from '@/services/reviewTag';
import config from '@/config/index';
import Modal from '@/components/modal/modal';
import Review from '@/components/review';
import OpeTimeDetail from '@/components/detail/OpeTimeDetail';
import PageLayout from '@/components/PageLayout';

const { apiBaseUrl } = config;

const ShopPresenter = ({ shop, reviews, reviewTags }) => {
  const { id } = shop;
  const { name, address_detail, latitude, longitude, shop_images } =
    shop.attributes;

  return (
    <>
      <PageLayout>
        <Link href="/shops"> BACK</Link>
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        <div>{name}</div>
        <div>{address_detail}</div>
        <div>{latitude}</div>
        <div>{longitude}</div>
        <OpeTimeDetail ope={shop.attributes.shop_operating_times.data} />
        {shop_images.data
          ? shop_images.data.map((shop_image, index) => {
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
            })
          : ''}
        <br />
        <h2>รีวิวจากผู้ใช้งาน</h2>
        <br />
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </PageLayout>
      <Modal shopId={id} reviewTags={reviewTags} />
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
