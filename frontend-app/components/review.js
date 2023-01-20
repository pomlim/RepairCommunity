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
      <h1>{reviewInfo.username}</h1>
      <h2>{reviewInfo.review}</h2>
      {presenteCreateDate ? <p>{presenteCreateDate}</p> : null}
      {reviewTags
        ? reviewTags.map((tag, index) => {
            return <p key={index}>{tag.name}</p>;
          })
        : null}
      {images
        ? images.map((image, index) => {
            return (
              <Image
                key={index}
                loader={() => apiBaseUrl + image.attributes.url}
                src={apiBaseUrl + image.attributes.url}
                alt="/"
                width={100}
                height={100}
              />
            );
          })
        : null}
      <hr></hr>
    </div>
  );
}
export default Review;
