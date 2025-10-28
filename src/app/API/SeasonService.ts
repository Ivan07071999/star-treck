//import type { ApiResponse, ResponseType } from '../index';
import { ApiResponse, ResponseType } from '../../types';
export class SeasonService {
  static async getAll() {
    const url = new URL('https://stapi.co/api/v1/rest/season/search');
    const response = await fetch(url);
    const data: ApiResponse = await response.json();

    return data;
  }

  static async getSelectSeason(uid: string | null) {
    const response = await fetch(`https://stapi.co/api/v1/rest/season?uid=${uid}`);
    const data: ResponseType = await response.json();

    return data;
  }
}
