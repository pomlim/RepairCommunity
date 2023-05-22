import axios from 'axios';
import config from '@/config/index';

class ReviewService {
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
      this.instance = new ReviewService();
    }
    return this.instance;
  }

  async UploadImageFiles(formdata) {
    const url = `/api/upload`;
    const resp = await this.axiosClient.post(url, formdata);
    return resp.data;
  }

  async CreateReview(payload) {
    const url = `/api/reviews`;
    const resp = await this.axiosClient.post(url, payload);
    return resp.data;
  }
}

const ReviewServiceInstance = ReviewService.Instance();

export default ReviewServiceInstance;
export { ReviewServiceInstance, ReviewService };
