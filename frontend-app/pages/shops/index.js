import { useState } from 'react';
import shopService from '@/services/shop';
import opeTimeService from '@/services/opeTime';
import SearchBox from '@/components/SearchBox';
import OpeTimeList from '@/components/list/OpeTimeList';

const ShopsPage = ({ shops, opeTimes, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  const [inputText, changeInputText] = useState('');
  const [tempShops, setTempShops] = useState(shops);
  const getSearchData = async () => {
    const searchResp = shopService.GetShopsBySearch(inputText);
    const [searchShops] = await Promise.all([searchResp]);
    setTempShops(searchShops);
  };

  return (
    <ul>
      <SearchBox
        searchText={inputText}
        updateSearch={changeInputText}
        onClick={() => getSearchData()}
      />
      <button onClick={() => getSearchData()}>Search</button>
      {tempShops.map((shop) => {
        const id = shop.id;
        const url = `/shops/${id}`;
        const opeLists = opeTimes.filter(
          (opeTime) => opeTime.attributes.shop.data.id === shop.id
        );
        return (
          <div key={id}>
            <a href={url}> {shop.attributes.name}</a>
            <h4>{shop.attributes.address_detail}</h4>
            <OpeTimeList ope={opeLists} />
            <h4>latitude : {shop.attributes.latitude}</h4>
            <h4>longtitude : {shop.attributes.longitude}</h4>
          </div>
        );
      })}
    </ul>
  );
};

ShopsPage.getInitialProps = async () => {
  const opeTimeResp = opeTimeService.getAllOpeTime();
  const shopResp = shopService.getAllShops();
  const [shops, opeTimes] = await Promise.all([shopResp, opeTimeResp]);
  return { shops, opeTimes };
};

export default ShopsPage;
