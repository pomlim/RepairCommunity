import { useState } from 'react';
import shopService from '@/services/shop';
import repairTagService from '@/services/repairTag';
import SearchBox from '@/components/SearchBox';
import OpeTimeList from '@/components/list/OpeTimeList';
import PageLayout from '@/components/PageLayout';
import FilterTagModal from '@/components/modal/filterTagModal';

import StarRating from '@/components/review/StarRating';

const ReviewSummary = ({ reviews }) => {
  const reviewScores = reviews.data.map((review) => {
    return review.attributes.score;
  });
  const numReviewers = reviews.data.length;

  const averageScore =
    numReviewers !== 0
      ? reviewScores.reduce((a, b) => a + b) / numReviewers
      : 0;

  const getReviewerNumberText = (numReviewers) => {
    if (numReviewers > 100) return '100+ รีวิว';
    else if (numReviewers > 50) return '50+ รีวิว';
    else if (numReviewers > 10) return '10+ รีวิว';

    return `${numReviewers} รีวิว`;
  };
  return (
    <div>
      <StarRating rating={averageScore} setRating={() => {}} />
      {getReviewerNumberText(numReviewers)}
    </div>
  );
};

const ShopsPage = ({ shops, repairTags, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  const [inputText, changeInputText] = useState('');
  const [tempShops, setTempShops] = useState(shops);
  const [filter, setFilter] = useState(false);
  const [filterRepairTags, setFilterRepairTags] = useState(
    repairTags.map((repairTag) => {
      return { ...repairTag, checked: false };
    })
  );
  const convertRepairTagArrayToText = (filterTags) => {
    const checkedRepairTagText = filterTags.map((filterTag) => {
      if (filterTag.checked === true) {
        return filterTag.attributes.name;
      }
    });
    return checkedRepairTagText;
  };

  const getSearchData = async () => {
    const searchResp = shopService.GetShopsBySearch(
      inputText,
      convertRepairTagArrayToText(filterRepairTags)
    );
    const [searchShops] = await Promise.all([searchResp]);
    setTempShops(searchShops);
  };

  const onFormat = () => {
    setFilter(true);
  };

  return (
    <PageLayout>
      <ul>
        <SearchBox
          searchText={inputText}
          updateSearch={changeInputText}
          onClick={() => getSearchData()}
        />
        <button onClick={() => getSearchData()}>Search</button>
        <button
          onClick={onFormat}
          className="m-3 border-solid rounded-full btn w-60 btn-outline"
        >
          ปรับรูปแบบการซ่อม
        </button>
        {filter && (
          <FilterTagModal
            repairTags={filterRepairTags}
            updateRepairTags={setFilterRepairTags}
            updateShops={setTempShops}
            searchText={inputText}
            convertArrayToText={convertRepairTagArrayToText}
            setFilter={setFilter}
          />
        )}
        {tempShops.map((shop) => {
          const id = shop.id;
          const url = `/shops/${id}`;
          return (
            <div key={id}>
              <a href={url}> {shop.attributes.name}</a>
              <h4>{shop.attributes.address_detail}</h4>
              <OpeTimeList ope={shop.attributes.shop_operating_times.data} />
              <h4>latitude : {shop.attributes.latitude}</h4>
              <h4>longtitude : {shop.attributes.longitude}</h4>
              {shop.attributes.reviews ? (
                <ReviewSummary reviews={shop.attributes.reviews} />
              ) : null}
            </div>
          );
        })}
      </ul>
    </PageLayout>
  );
};

ShopsPage.getInitialProps = async () => {
  const shopResp = shopService.getAllShops();
  const repairResp = repairTagService.getAllRepairTag();
  const [shops, repairTags] = await Promise.all([shopResp, repairResp]);
  return { shops, repairTags };
};

export default ShopsPage;
