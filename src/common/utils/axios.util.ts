import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { replaceUrl } from '../helpers/replace-url.helper';

@Injectable()
export class AxiosService {
  private readonly logger: Logger = new Logger(AxiosService.name);

  constructor(private readonly httpService: HttpService) {}

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const url = replaceUrl(endpoint, params);
      const res: any = await this.httpService.axiosRef.get(url, configs);
      return res.data;
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async post(endpoint: string, params = {}, body: {}, configs = {}) {
    try {
      const url = replaceUrl(endpoint, params);
      const res: any = await this.httpService.axiosRef.post(url, body, configs);

      return res.data;
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async put(endpoint: string, params = {}, body: {}, configs = {}) {
    try {
      const url = replaceUrl(endpoint, params);
      const res: any = await this.httpService.axiosRef.put(url, body, configs);

      return res.data;
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async delete(endpoint: string, params = {}, configs: {}) {
    try {
      const url = replaceUrl(endpoint, params);
      const res: any = await this.httpService.axiosRef.delete(url, configs);
      return res.data;
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
