import { PortableTextBlock } from "sanity";

export type WishlistItem = {
  _id: number;
  name: string;
  reviews: string[];
  price: number;
  discountedPrice: number;
  category?: string;
  tags?: string[];
  description?: PortableTextBlock[];
  shortDescription?: string;
  colors?: string[];
  thumbnails?: any;
  previewImages?: any;
  additionalInformation?: {
    name: string;
    description: string;
  }[];
  customAttributes?: {
    attributeName: string;
    attributeValues: Array<{
      id: string;
      title: string;
    }>;
  }[];
  status?: boolean;
  offers?: string[];
  slug?: {
    current: string;
  };
  price_id?: string;
  currency?: string;
  sku?: string;
  quantity: number;
  body?: PortableTextBlock[];
};
