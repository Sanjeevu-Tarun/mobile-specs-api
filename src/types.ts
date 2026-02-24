export interface ISearchResult {
    name: string;
    slug: string;
    imageUrl?: string;
    detail_url: string;
}
  
export type TSpecCategory = Record<string, string>;
  
export interface IPhoneDetails {
    brand: string;
    model: string;
    imageUrl?: string;
    release_date: string;
    dimensions: string;
    os: string;
    storage: string;
    specifications: Record<string, TSpecCategory>;
}
  
export interface IBrandDetails {
    brand_id: number;
    brand_slug: string;
    device_count: number;
    detail_url: string;
}
  
  
export interface IPhoneListItem {
    name: string;
    slug: string;
    imageUrl?: string;
    detail_url: string;
    rank?: number;
    hits?: number;
}
  