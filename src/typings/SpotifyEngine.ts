import axios, { AxiosInstance } from 'axios';
import apiConstants from '../constants/api';
import { logError } from '../utils/logger';
import { StreamingService } from './StreamingService';

class SpotifyEngine implements StreamingService {
  token: string;

  userId?: string | undefined;

  httpClient: AxiosInstance = axios.create({
    baseURL: apiConstants.SPOTIFY_API_BASE_URL,
    timeout: 10000,
  });

  constructor(token: string) {
    this.token = token;

    this.httpClient = axios.create({
      baseURL: apiConstants.SPOTIFY_API_BASE_URL,
      timeout: 10000,
      headers: { Authorization: `Bearer ${token}` },
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
    const response = await this.httpClient.get('/me');

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    return response;
  };
}

export default SpotifyEngine;