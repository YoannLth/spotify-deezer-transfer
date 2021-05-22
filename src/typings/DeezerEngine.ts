import axios, { AxiosInstance } from 'axios';
import apiConstants from '../constants/api';
import { logError } from '../utils/logger';
import { StreamingService } from './StreamingService';

class DeezerEngine implements StreamingService {
  token: string;

  userId?: string | undefined;

  httpClient: AxiosInstance = axios.create({
    baseURL: apiConstants.DEEZER_API_BASE_URL,
    timeout: 10000,
  });

  constructor(token: string) {
    this.token = token;

    this.httpClient = axios.create({
      baseURL: apiConstants.DEEZER_API_BASE_URL,
      timeout: 10000,
      params: {
        access_token: token,
      },
    });
  }

  verifyConnection = async () => {
    try {
      await this.fetchUserData();
      return true;
    } catch (error) {
      logError(error);
      return false;
    }
  };

  fetchUserData = async (): Promise<any> => {
    const response = await this.httpClient.get('/user/me');
    
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (response.data.id) {
      // TODO: type response
      this.userId = `${response.data.id}`;
    }

    return response;
  };
}

export default DeezerEngine;
