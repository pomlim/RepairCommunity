import axios from 'axios';
import qs from 'qs';
import config from '@/config/index';

class ShopService {
  instance = null;
  axiosClient = null;

  constructor(c, baseURL = config.apiBaseUrl) {
    if (c) {
      this.axiosClient = c;
      return;
    }
    this.axiosClient = axios.create({
      baseURL
    });
  }

  static Instance() {
    if (!this.instance) {
      this.instance = new ShopService();
    }
    return this.instance;
  }

  async GetByID(id) {
    const url = `/api/Shops/${id}?populate=deep`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async GetReviewsByShopID(id) {
    const url = `/api/reviews?filters[shop]=${id}&populate=deep`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async GetShopsBySearch(searchText) {
    const query = qs.stringify(
      {
        filters: {
          $or: [
            {
              name: { $contains: searchText }
            },
            {
              address_detail: { $contains: searchText }
            }
          ]
        }
      },
      {
        encodeValuesOnly: true // prettify URL
      }
    );
    const url = `/api/Shops?${query}&populate=deep`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async GetShopsByTag(repairTags) {
    const query = qs.stringify(
      {
        filters: {
          shop_repair_tag_links: {
            repair_tag: {
              name: {
                $in: repairTags
              }
            }
          }
        }
      },
      {
        encodeValuesOnly: true // prettify URL
      }
    );
    const url = `/api/Shops?${query}&populate=deep`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async getAllShops() {
    const url = `/api/Shops/?populate=*`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const ShopServiceInstance = ShopService.Instance();

export default ShopServiceInstance;
export { ShopServiceInstance, ShopService };
