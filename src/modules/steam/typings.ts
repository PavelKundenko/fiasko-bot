export interface ISteamGame {
  id: number,
  type: number,
  name: string,
  discounted: boolean,
  discount_percent: number,
  original_price: number,
  final_price: number,
  currency: string,
  large_capsule_image: string,
  small_capsule_image: string,
  windows_available: boolean,
  mac_available: boolean,
  linux_available: boolean,
  streamingvideo_available: boolean,
  discount_expiration: number,
  header_image: string,
  controller_support?: 'full';
}

export interface ISteamCollection {
  id: string;
  name: string;
  items: ISteamGame[];
}

export interface IFeaturedCategoriesResponse {
  specials: ISteamCollection;
  coming_soon: ISteamCollection;
  top_sellers: ISteamCollection;
  new_releases: ISteamCollection;
}
