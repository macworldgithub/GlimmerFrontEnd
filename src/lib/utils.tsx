import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AreaType,
  CardType,
  ProductType,
  ReviewType,
  SalonType,
} from "@/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import AddToCartBtn from "@/app/selfcare-products/components/add-to-cart-btn";
import CardImage from "@/app/selfcare-products/components/card-image";
import FakeReview from "@/app/components/reviews-fake";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimString(str: string, max = 40) {
  return str.length > max ? `${str.slice(0, max)}...` : str;
}

export function mapProducts(Products: ProductType[]): CardType[] {
  return Products.map((item) => ({
    border: true,
    image: (
      <CardImage route={`/selfcare-products/${item._id}`} src={item.image} />
    ),
    bgColor: "white",
    top: {
      left: (
        <p className="text-nowrap text-lg text-neutral">
          {trimString(item.title, 20)}
        </p>
      ),
      right: (
        <div className="flex items-center">
          <FaStar className="mr-1 mb-1 size-4 text-primary" />
          <span className=" text-neutral">{item.rating}</span>
        </div>
      ),
    },
    bottom: {
      left: item.discountPercent ? (
        <div className="flex items-center">
          <p className="text-[#878683] text-sm">
            <del>{item.price}</del>
          </p>
          &nbsp;
          <p className="text-base-content text-md">
            {Math.floor(item.price * (100 - item.discountPercent) * 0.01)} PKR
          </p>
        </div>
      ) : (
        <p className="text-base-content">{item.price} PKR</p>
      ),
      right: item.discountPercent ? (
        <p className="text-success">{item.discountPercent}% off</p>
      ) : null,
    },
    actionBtn: {
      full: <AddToCartBtn product={item} />,
    },
  }));
}

export function mapSalons(salonsExample: SalonType[]): CardType[] {
  return salonsExample.map((salon) => ({
    top: {
      left: <h2 className="font-bold text-2xl text-base-100">{salon.name}</h2>,
      right: (
        <span className="flex items-center text-base-100">
          <FaRegStar /> &nbsp; {salon.rating}
        </span>
      ),
    },
    bottom: {
      left: <p className="text-base-100 text-sm">{salon.address}</p>,
    },
    actionBtn: {
      right: (
        <button className="btn btn-base bg-base-100 text-base-content capitalize">
          Book Now
        </button>
      ),
    },
    image: <CardImage route={`/salons/${salon.name}`} src={salon.image} />,
    bgColor: "secondary",
  }));
}

export function mapAreas(areas: AreaType[]): CardType[] {
  return areas.map((a, i) => ({
    top: {
      full: (
        <div key={i} className="">
          <div>
            <div className="mb-2 font-bold text-xl">{a.city}</div>
            {[...Array(a.salons.length)].map((_, index) => (
              <p key={index} className="mb-1 text-[#878683] leading-6">
                {a.salons[index]}
              </p>
            ))}
          </div>
        </div>
      ),
    },
    actionBtn: {},
    image: null,
    bgColor: "white",
  }));
}

export function mapReviews(review: ReviewType[]): CardType[] {
  return review.map((r, i) => ({
    top: {
      full: <FakeReview key={i} review={r} />,
    },
    actionBtn: {},
    image: null,
    bgColor: "base-300",
  }));
}

export const sanitizeSlug = (slug?: string, fallback?: string) => {
  if (!slug && fallback) return fallback;
  return (slug || "").replace(/\//g, "");
};

export const formatSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const COUNTRY_BLACKLIST = new Set([
  "pakistan",
  "india",
  "united states",
  "usa",
  "united kingdom",
  "uk",
  "canada",
  "australia",
  "bangladesh",
  "uae",
  "france",
  "germany",
]);

const JUNK_WORDS =
  /\b(?:building|bldg|lane|phase|block|area|street|st|road|rd|commercial|sector|dha|bukhari|no|shop|flat|apartment|plot|near|opposite|corner)\b/i;

export function extractCityFromAddress(address?: string): string {
  if (!address) return "unknown";

  // Normalize and split by comma
  const parts = address
    .replace(/\s+/g, " ")
    .split(",")
    .map((p) => p.trim().replace(/[.]+$/g, "")) // remove trailing dots
    .filter(Boolean);

  if (parts.length === 0) return "unknown";

  // If last part is a country (Pakistan, etc.), drop it
  while (
    parts.length > 1 &&
    COUNTRY_BLACKLIST.has(parts[parts.length - 1].toLowerCase())
  ) {
    parts.pop();
  }

  // Walk backwards and pick first plausible token
  for (let i = parts.length - 1; i >= 0; i--) {
    const token = parts[i];
    // skip tokens that are mostly numbers or that contain junk address words
    if (!/^\d+$/.test(token.replace(/\s/g, "")) && !JUNK_WORDS.test(token)) {
      return token;
    }
  }

  // Fallback: last remaining part
  return parts[parts.length - 1];
}

export function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
