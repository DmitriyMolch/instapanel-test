import { Beer } from "./types";

class API {
  constructor(private readonly url: string) {}

  async getBeers(page: number, limit: number): Promise<Beer[]> {
    const res = await fetch(
      `${this.url}/beers?page=${page + 1}&per_page=${limit}`
    );
    const beers = await res.json();
    return beers.sort((a: Beer, b: Beer) => (a.abv < b.abv ? -1 : 1));
  }
}

export default new API("https://api.punkapi.com/v2");
