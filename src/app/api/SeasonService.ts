export default class SeasonService {
  static async getAll(limit = 10, page = 1) {
    const url = new URL('https://stapi.co/api/v1/rest/season/search');
    url.searchParams.append('_limit', limit);
    url.searchParams.append('_page', page);

    const response = await fetch(url.toString());
    const data = await response.json();

    return data;
  }
}
