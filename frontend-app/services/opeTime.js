import axios from 'axios';
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

  async GetOpeTimeById(id) {
    const url = `/api/Shop-Operating-Times?filters[shop]=${id}`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }

  async getAllOpeTime() {
    const url = `/api/Shop-Operating-Times/?populate=*`;
    const resp = await this.axiosClient.get(url);
    return resp.data?.data;
  }
}

const OpeTimeServiceInstance = OpeTimeService.Instance();

export default OpeTimeServiceInstance;
export { OpeTimeServiceInstance, OpeTimeService };
