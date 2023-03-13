import Zoom from 'next-image-zoom';
import config from '@/config/index';
import moment from 'moment';

const { apiBaseUrl } = config;

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 100
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};
const Review = ({ review }) => {
  const reviewInfo = review.attributes;
  const createDate = moment(reviewInfo.createdAt);

  const daysDiff = moment().diff(createDate, 'days');
  let presenteCreateDate = null;
  if (daysDiff < 90) {
    presenteCreateDate = createDate.fromNow();
  } else {
    presenteCreateDate = createDate.format('ll');
  }

  const images = reviewInfo.images ? reviewInfo.images.data : null;
  const reviewTags = reviewInfo.review_tag_links
    ? reviewInfo.review_tag_links.data.map((tagLinks) => {
        return tagLinks.attributes.review_tag.data.attributes;
      })
    : null;
  return (
    <div className="review">
      <p className="text-base text-brown-default font-normal font-kanit">{reviewInfo.username}</p>
      {presenteCreateDate ? (
        <p className="font-bold text-secondary-content text-brown-mid text-xs font-medium font-kanit">{presenteCreateDate}</p>
      ) : null}

      {images ? (
        <Carousel responsive={responsive}>
          {images.map((image, index) => {
            return (
              <div key={index} className={`mr-2`}>
                <Zoom
                  src={apiBaseUrl + image.attributes.url}
                  width={100}
                  height={100}
                />
              </div>
            );
          })}
        </Carousel>
      ) : null}
      {reviewTags ? (
        <div className="flex flex-row flex-wrap">
          {reviewTags.map((tag, index) => {
            return (
              <p
                className="mr-3 mt-3 p-1 border-[1px] border-primary-content rounded text-brown-mid text-base font-kanit font-normal"
                key={index}
              >
                {tag.name}
              </p>
            );
          })}
        </div>
      ) : null}
      <p className="text-base text-normal text-brown-default font-normal font-kanit">{reviewInfo.review}</p>
    </div>
  );
};
export default Review;
