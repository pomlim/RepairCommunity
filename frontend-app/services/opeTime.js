import axios from 'axios';
import qs from 'qs';
import config from '@/config/index';

class OpeTimeService {
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
      this.instance = new OpeTimeService();
    }
    return this.instance;
  }

  // async GetOpeTimeById(id) {
  //   const query = qs.stringify(
  //     {
  //       filters: {
  //         $or: [
  //           {
  //             day: { $contains: searchText }
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       encodeValuesOnly: true // prettify URL
  //     }
  //   );
  //   const url = `/api/Shop-Operating-Times?${query}`;
  //   const resp = await this.axiosClient.get(url);
  //   return resp.data?.data;
  // }

  async GetOpeTimeById(id) {
    // const url = `/api/Shop-Operating-Times/${id}?populate=*`;
    const url = `/api/Shop-Operating-Times?filters[shop]=${id}`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async GetAll() {
    const url = `/api/Shop-Operating-Times/?populate=*`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const OpeTimeServiceInstance = OpeTimeService.Instance();

export default OpeTimeServiceInstance;
export { OpeTimeServiceInstance, OpeTimeService };
