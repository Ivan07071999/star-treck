export class SeasonService {
  static async getAll() {
    const url = new URL('https://stapi.co/api/v1/rest/season/search');

    const response = await fetch(url.toString());
    const data = await response.json();

    return data;
  }
}
