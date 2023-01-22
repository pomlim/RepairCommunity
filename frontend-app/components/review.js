import Image from 'next/image';
import config from '@/config/index';
import moment from 'moment';

const { apiBaseUrl } = config;

function Review({ review }) {
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
      <p className="font-bold">{reviewInfo.username}</p>
      {presenteCreateDate ? (
        <p className="font-bold  text-secondary-content">
          {presenteCreateDate}
        </p>
      ) : null}

      {images ? (
        <div className="flex flex-wrap flex-row">
          {images.map((image, index) => {
            return (
              <div key={index} className="mr-2 ">
                <Image
                  loader={() => apiBaseUrl + image.attributes.url}
                  src={apiBaseUrl + image.attributes.url}
                  alt="/"
                  width={100}
                  height={100}
                  className="rounded-[8px]"
                />
              </div>
            );
          })}
        </div>
      ) : null}

      {reviewTags ? (
        <div className="flex flex-wrap flex-row">
          {reviewTags.map((tag, index) => {
            return (
              <p
                className="mr-3 mt-3 p-1 border-[1px] border-secondary-content rounded font-bold text-secondary-content"
                key={index}
              >
                {tag.name}
              </p>
            );
          })}
        </div>
      ) : null}
      <p className="font-bold">{reviewInfo.review}</p>
    </div>
  );
}
export default Review;
