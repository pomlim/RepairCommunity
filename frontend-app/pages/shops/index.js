import { useState } from 'react';
import shopService from '@/services/shop';
import repairTagService from '@/services/repairTag';
import SearchBox from '@/components/SearchBox';
import OpeTimeList from '@/components/list/OpeTimeList';
import PageLayout from '@/components/PageLayout';
import FilterTagModal from '@/components/modal/filterTagModal';
import MapList from '@/components/MapList';
import { useGeolocated } from 'react-geolocated';
import { getDistance } from 'geolib';
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

  const [selectedDistance, setSelectedDistance] = useState(100);
  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    });

  const calculateDistance = (lat, lng) => {
    if (coords) {
      const diffDistance =
        getDistance(
          // { latitude: coords.latitude, longitude: coords.longitude },
          // Fix data for testing (@BTS Phyathai)
          { latitude: 13.793017268140483, longitude: 100.54925081035572 },
          { latitude: lat, longitude: lng }
        ) / 1000;
      return diffDistance;
    }
  };

  tempShops.sort((a, b) =>
    calculateDistance(a.attributes.latitude, a.attributes.longitude) >
    calculateDistance(b.attributes.latitude, b.attributes.longitude)
      ? 1
      : -1
  );

  const totalShops = tempShops.filter(
    (shop) =>
      calculateDistance(shop.attributes.latitude, shop.attributes.longitude) <=
      selectedDistance
  );

  return (
    <PageLayout>
      <ul>
        <SearchBox
          searchText={inputText}
          updateSearch={changeInputText}
          onClick={() => getSearchData()}
        />
        <div>
          <button onClick={() => getSearchData()}>Search</button>
        </div>
        <select
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="m-3 border-solid rounded-full btn w-60 btn-outline"
        >
          <option value="100">ปรับระยะทาง</option>
          <option value="2">2 กม</option>
          <option value="5">5 กม</option>
          <option value="10">10 กม</option>
          <option value="15">15 กม</option>
        </select>
        <button
          onClick={onFormat}
          className="m-3 border-solid rounded-full btn w-60 btn-outline"
        >
          ปรับรูปแบบการซ่อม
        </button>
        <MapList initialLocation={coords} shops={totalShops} />
        <div>ผลการค้นหา {totalShops.length} ร้านซ่อม</div>
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
        {totalShops.map((shop) => {
          const id = shop.id;
          const url = `/shops/${id}`;
          const distance = calculateDistance(
            shop.attributes.latitude,
            shop.attributes.longitude
          );
          return (
            <div key={id}>
              <h4>ห่างจากฉัน {distance} กม</h4>
              <a href={url}> {shop.attributes.name}</a>
              <h4>{shop.attributes.address_detail}</h4>
              <OpeTimeList ope={shop.attributes.shop_operating_times.data} />
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
