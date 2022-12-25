import Image from 'next/image';
import config from '@/config/index';
const { apiBaseUrl } = config;

function Review({ review }) {
  const reviewInfo = review.attributes;
  const images = reviewInfo.images.data;
  const reviewTags = reviewInfo.review_tag_links.data.map((tagLinks) => {
    return tagLinks.attributes.review_tag.data.attributes;
  });
  console.log(review);
  return (
    <div className="review">
      <h2>{reviewInfo.review}</h2>
      {reviewTags.map((tag, index) => {
        return <p key={index}>{tag.name}</p>;
      })}
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
    </div>
  );
}
export default Review;
