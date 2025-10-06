export class SeasonService {
  static async getAll() {
    const url = new URL('https://stapi.co/api/v1/rest/season/search');

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  static async getSelectSeason(uid: string) {
    const response = await fetch(`https://stapi.co/api/v1/rest/season?uid=${uid}`);
    const data = await response.json();

    return data;
  }
}
