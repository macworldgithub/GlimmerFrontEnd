import SelfCare1 from "@/assets/selfcare-items/selfcare-item-1.png";
import SelfCare2 from "@/assets/selfcare-items/selfcare-item-2.png";
import SelfCare3 from "@/assets/selfcare-items/selfcare-item-3.png";
import SelfCare4 from "@/assets/selfcare-items/selfcare-item-4.png";
import {
  AreaType,
  ProductType,
  ReviewType,
  SalonType,
  SelfcareItemsType,
} from "@/types";
import salon1 from "@/assets/salons/salon-1.png";
import salon2 from "@/assets/salons/salon-2.png";
import salon3 from "@/assets/salons/salon-3.png";
import salon4 from "@/assets/salons/salon-4.png";
import review1 from "@/assets/reviews/review-img-1.png";
import review2 from "@/assets/reviews/review-img-2.png";
import review3 from "@/assets/reviews/review-img-3.png";
import review4 from "@/assets/reviews/review-img-4.png";
import { faker } from "@faker-js/faker";

const generateProduct = (img: string, addVariation: boolean): ProductType => ({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image: img,
  howToUse: faker.lorem.sentence(),
  maxAllowedInCart: 10,
  rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  price: faker.number.int({ min: 100, max: 1000 }),
  discountPercent: faker.number.int({ min: 0, max: 50 }),
  salonRefId: faker.string.uuid(),
  _id: faker.string.uuid(),
  variations: addVariation
    ? [
        {
          title: "color",
          variationList: ["red", "green", "blue"],
        },
        {
          title: "size",
          variationList: ["small", "medium", "large"],
        },
      ]
    : [],
});
function getSelfCareProducts() {
  return Array.from({ length: 10 }, (_, i) => {
    const img =
      i % 4 === 0
        ? SelfCare1.src
        : i % 4 === 1
        ? SelfCare2.src
        : i % 4 === 2
        ? SelfCare3.src
        : SelfCare4.src;
    const addVariation = i % 2 === 0;
    return generateProduct(img, addVariation);
  });
}
const alreadyGeneratedscProducts: ProductType[] = [
  {
    title: "Licensed Granite Pizza",
    description:
      "Rosenbaum Group's most advanced Salad technology increases ample capabilities",
    image: SelfCare1.src,
    howToUse: "Trucido umerus deludo sumo vapulus delibero.",
    maxAllowedInCart: 10,
    rating: 2.6,
    price: 640,
    discountPercent: 37,
    salonRefId: "fd39ceea-7e73-4ef9-8e3f-16f610e3a609",
    _id: "4c710024-114e-49e6-ac73-110104603302",
    variations: [
      {
        title: "color",
        variationList: ["red", "green", "blue"],
      },
      {
        title: "size",
        variationList: ["small", "medium", "large"],
      },
    ],
  },
  {
    title: "Unbranded Cotton Fish",
    description: "Our ostrich-friendly Hat ensures pale comfort for your pets",
    image: SelfCare2.src,
    howToUse: "Defaeco cupio vacuus terga vulticulus.",
    maxAllowedInCart: 10,
    rating: 4,
    price: 720,
    discountPercent: 32,
    salonRefId: "861deb8c-4114-4996-b23b-1c2697de2178",
    _id: "2634c8eb-2ea1-446f-9353-a47a6d045bd2",
    variations: [],
  },
  {
    title: "Intelligent Fresh Shoes",
    description:
      "The red Towels combines Fiji aesthetics with Vanadium-based durability",
    image: SelfCare3.src,
    howToUse: "Custodia rerum cauda desolo cogo tego optio.",
    maxAllowedInCart: 10,
    rating: 2.2,
    price: 244,
    discountPercent: 44,
    salonRefId: "42dbbc44-108f-4ef6-a788-914e1498fb3c",
    _id: "98e4f5da-9038-4e60-bee7-55501ef780ec",
    variations: [
      {
        title: "color",
        variationList: ["red", "green", "blue"],
      },
      {
        title: "size",
        variationList: ["small", "medium", "large"],
      },
    ],
  },
  {
    title: "Elegant Fresh Pants",
    description:
      "New Pizza model with 35 GB RAM, 843 GB storage, and acidic features",
    image: SelfCare4.src,
    howToUse: "Suppellex basium vere coadunatio.",
    maxAllowedInCart: 10,
    rating: 1.6,
    price: 650,
    discountPercent: 10,
    salonRefId: "00aef787-b014-453c-8f8e-ec9bafce47c8",
    _id: "ce1ebb14-1f08-465c-878f-4c0e025a2356",
    variations: [],
  },
  {
    title: "Rustic Concrete Salad",
    description:
      "Introducing the Saint Pierre and Miquelon-inspired Shoes, blending rigid style with local craftsmanship",
    image: SelfCare1.src,
    howToUse:
      "Bibo calamitas confero aut viscus triduana cometes varius ulciscor blanditiis.",
    maxAllowedInCart: 10,
    rating: 4.3,
    price: 488,
    discountPercent: 37,
    salonRefId: "e25436d3-4511-4d5e-9f0d-6ebedc1f29d1",
    _id: "d4c0fa0f-fdc8-421c-b053-ccd5b9daaecf",
    variations: [
      {
        title: "color",
        variationList: ["red", "green", "blue"],
      },
      {
        title: "size",
        variationList: ["small", "medium", "large"],
      },
    ],
  },
  {
    title: "Practical Granite Ball",
    description: "New cyan Gloves with ergonomic design for tense comfort",
    image: SelfCare2.src,
    howToUse: "Utrimque thymbra coniuratio deleo spoliatio.",
    maxAllowedInCart: 10,
    rating: 1.1,
    price: 773,
    discountPercent: 47,
    salonRefId: "b6a96027-fd7f-44db-880f-aa6948a48404",
    _id: "03317a8d-65ea-4fb6-93b3-331344d44ad8",
    variations: [],
  },
  {
    title: "Fantastic Frozen Bacon",
    description: "Sleek Gloves designed with Frozen for favorable performance",
    image: SelfCare3.src,
    howToUse: "Contra commemoro conatus deripio succedo.",
    maxAllowedInCart: 10,
    rating: 3.9,
    price: 533,
    discountPercent: 36,
    salonRefId: "63cf273c-7802-4c4a-ba04-6da092432cb1",
    _id: "14b07a89-3f20-40df-b1d4-16c38ede4e36",
    variations: [
      {
        title: "color",
        variationList: ["red", "green", "blue"],
      },
      {
        title: "size",
        variationList: ["small", "medium", "large"],
      },
    ],
  },
  {
    title: "Gorgeous Steel Bike",
    description:
      "The sleek and powerless Tuna comes with blue LED lighting for smart functionality",
    image: SelfCare4.src,
    howToUse: "Confido uberrime solus vereor derelinquo.",
    maxAllowedInCart: 10,
    rating: 3.6,
    price: 930,
    discountPercent: 17,
    salonRefId: "4bd187ee-52ba-44c0-be99-124ae7cf0edf",
    _id: "95fb5979-5af0-4863-9d2d-0f8435c2654a",
    variations: [],
  },
  {
    title: "Practical Granite Gloves",
    description:
      "Our sour-inspired Shoes brings a taste of luxury to your ajar lifestyle",
    image: SelfCare1.src,
    howToUse:
      "Defessus coepi conor clamo animus corrupti demo aer absens catena.",
    maxAllowedInCart: 10,
    rating: 4.8,
    price: 931,
    discountPercent: 27,
    salonRefId: "f6a7b3e3-7c19-43c2-a8c0-8d5d1c026f3c",
    _id: "eb76ca8a-e4f7-44fc-9d54-958aa47c150d",
    variations: [
      {
        title: "color",
        variationList: ["red", "green", "blue"],
      },
      {
        title: "size",
        variationList: ["small", "medium", "large"],
      },
    ],
  },
  {
    title: "Recycled Cotton Chicken",
    description:
      "Innovative Cheese featuring squeaky technology and Rubber construction",
    image: SelfCare2.src,
    howToUse: "Adipiscor harum eaque commodo molestias comparo.",
    maxAllowedInCart: 10,
    rating: 1.6,
    price: 151,
    discountPercent: 14,
    salonRefId: "387d994c-8ce3-4618-9527-b771d61fb396",
    _id: "f89c999d-f37a-4976-b498-20ee4020e84e",
    variations: [],
  },
];
export const SelfCareProductsData: ProductType[] = alreadyGeneratedscProducts;
export const BestSellersData: ProductType[] = SelfCareProductsData;
export const NewArrivalsData: ProductType[] = SelfCareProductsData;
export const BudgetFriendlyData: ProductType[] = SelfCareProductsData;

export const SalonsData: SalonType[] = [
  {
    name: "salon 1",
    address: "Address 1",
    rating: 4.5,
    image: salon1.src,
  },
  {
    name: "salon 2",
    address: "Address 2",
    rating: 4.5,
    image: salon2.src,
  },
  {
    name: "salon 3",
    address: "Address 3",
    rating: 4.5,
    image: salon3.src,
  },
  {
    name: "salon 4",
    address: "Address 4",
    rating: 4.5,
    image: salon4.src,
  },
  {
    name: "salon 5",
    address: "Address 1",
    rating: 4.5,
    image: salon1.src,
  },
  {
    name: "salon 6",
    address: "Address 2",
    rating: 4.5,
    image: salon2.src,
  },
  {
    name: "salon 7",
    address: "Address 3",
    rating: 4.5,
    image: salon3.src,
  },
  {
    name: "salon 8",
    address: "Address 4",
    rating: 4.5,
    image: salon4.src,
  },
];

export const areasData: AreaType[] = [
  {
    city: "Gulshan",
    salons: [
      "Nabila's Salon",
      "Saffron Salon",
      "Bashir's Beauty Salon",
      "Toni&Guy",
      "Islamabad",
    ],
  },
  {
    city: "Korangi",
    salons: [
      "Depilex Beauty Clinic",
      "Khadija's Beauty Studio",
      "The Salon by Ahsan",
      "Glamour Beauty Lounge",
    ],
  },
  { city: "Nazimabad", salons: ["Coco’s Beauty Bar", "Pinky’s Salon"] },
  {
    city: "Defense",
    salons: ["The Hair Studio", "Aura Beauty", "Salon Bella Donna"],
  },
  {
    city: "Saddar",
    salons: [
      "Zara’s Beauty Lounge",
      "Luxe Beauty Bar",
      "Chic Beauty Studio",
      "Fizza’s Beauty Lounge",
      "Silk & Stone Salon",
    ],
  },
];
export const reviewsData: ReviewType[] = [
  {
    stars: 5,
    title: "Purchase Product",
    description:
      "This product is so good. Recommended from me. Glimmer is a lifesaver. Thank you, Glimmer.",
    name: "Rumaisha Rauf",
    city: "Gulistan Town",
    image: review1.src,
  },
  {
    stars: 5,
    title: "Saloon Service",
    description:
      "Glimmer make life so much easier. I also found a few good barbershops that I didn't know existed.",
    name: "Wisam Ahmad",
    city: "Korangi",
    image: review2.src,
  },
  {
    stars: 5,
    title: "Purchase Product",
    description:
      "I've been using Glimmer for two months and it's by far the best booking platform I've used. Highly recommend it!",
    name: "Maaz Ahmad",
    city: "Lahore",
    image: review3.src,
  },
  {
    stars: 5,
    title: "Purchase Product",
    description:
      "This product is so good. Recommended from me. Glimmer is a lifesaver. Thank you, Glimmer.",
    name: "Irza Rauf",
    city: "Karachi",
    image: review4.src,
  },
];

export interface CardItem {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: number;
  discounted_price: number;
}

export interface RealCardItem {
  _id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: number;
  discounted_price: number;
  category:string;
  sub_category:string;
  item:string;
  rate_of_salon: number;
  ref_of_salon: string;
}

export interface ServicesItems {
  name: string;
  categoryId: string;
  subCategoryName: string;
  subSubCategoryName: string;
  requestedPrice: number;
  adminPrice: number;
  adminSetPrice: number;
  discountPercentage: number;
  description: string;
  duration: string;
  image1: string;
  image2: string;
  image3: string;
  status: "Active" | "Inactive";
  created_at: string;
}

export const sampleProducts: CardItem[] = [
  {
    id: 1,
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    id: 2,
    name: "City Skyline",
    description: "Experience the bustling city life and iconic skyline views.",
    image1:
      "https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2t5bGluZXxlbnwwfHwwfHx8MA%3D%3D",
    image2:
      "https://images.unsplash.com/photo-1545156515-5f114d6685f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNpdHl8ZW58MHx8fHwxNjg5MTk3MzU3&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506377215391-5d4a33e271b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGNpdHl8ZW58MHx8fHwxNjg5MTk3Mzg1&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 200,
    discounted_price: 180,
  },
  {
    id: 3,
    name: "Beach Paradise",
    description: "Relax by the tranquil waves and golden sands of the beach.",
    image1:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQyNQ&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQ0Mw&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1533050487298-09f6c5a2c05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQ2Mg&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 250,
    discounted_price: 220,
  },
  {
    id: 4,
    name: "Mountain Expedition",
    description: "Conquer the heights and enjoy breathtaking views.",
    image1:
      "https://plus.unsplash.com/premium_photo-1661928975475-57502a6e34a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW91bnRhaW4lMjBjbGltYmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    image2:
      "https://images.unsplash.com/photo-1496533451468-9872bd0161d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWluc3xlbnwwfHx8fDE2ODkxOTY1OTk&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fG1vdW50YWluc3xlbnwwfHx8fDE2ODkxOTY2MDk&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 300,
    discounted_price: 270,
  },
  {
    id: 5,
    name: "Desert Adventure",
    description: "Discover the beauty and tranquility of the desert.",
    image1:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGRlc2VydHxlbnwwfHx8fDE2ODkxOTY2MjU&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1527799820374-5e674cc215fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRlc2VydHxlbnwwfHx8fDE2ODkxOTY2MzU&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1474490357822-de5a871e3747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGRlc2VydHxlbnwwfHx8fDE2ODkxOTY2NDU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 180,
    discounted_price: 150,
  },
  {
    id: 6,
    name: "Ocean Cruise",
    description: "Sail the high seas and enjoy luxury accommodations.",
    image1:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG9jZWFufGVufDB8fHx8MTY4OTE5NjY1Ng&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9jZWFufGVufDB8fHx8MTY4OTE5NjY3Ng&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1533050487298-09f6c5a2c05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fG9jZWFufGVufDB8fHx8MTY4OTE5NjY5Ng&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 400,
    discounted_price: 350,
  },
  {
    id: 7,
    name: "Jungle Safari",
    description: "Embark on a thrilling journey through the jungle.",
    image1:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8anVuZ2xlJTIwc2FmYXJpfGVufDB8fDB8fHww",
    image2:
      "https://images.unsplash.com/photo-1473992243365-58b2924bce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGp1bmdsZXxlbnwwfHx8fDE2ODkxOTY3MzQ&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506377215391-5d4a33e271b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGp1bmdsZXxlbnwwfHx8fDE2ODkxOTY3NDQ&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 220,
    discounted_price: 200,
  },
  {
    id: 8,
    name: "Countryside Retreat",
    description: "Escape to the peaceful countryside for a rejuvenating stay.",
    image1:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNvdW50cnl8ZW58MHx8fHwxNjg5MTk2NzQ1&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519817650390-64a93db511aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNvdW50cnl8ZW58MHx8fHwxNjg5MTk2NzY1&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1473992243365-58b2924bce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGNvdW50cnl8ZW58MHx8fHwxNjg5MTk2Nzc1&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 180,
    discounted_price: 160,
  },
  {
    id: 9,
    name: "Cultural Tour",
    description: "Dive into the rich heritage and traditions of the locals.",
    image1:
      "https://images.unsplash.com/photo-1465218550585-6d069382d2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGN1bHR1cmV8ZW58MHx8fHwxNjg5MTk2Nzg4&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1496533451468-9872bd0161d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGN1bHR1cmV8ZW58MHx8fHwxNjg5MTk2Nzk4&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGN1bHR1cmV8ZW58MHx8fHwxNjg5MTk2ODA4&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 140,
  },
  {
    id: 10,
    name: "Historic Landmarks",
    description:
      "Visit iconic landmarks and explore their fascinating stories.",
    image1:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhpc3RvcmljfGVufDB8fHx8MTY4OTE5NjgzMQ&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1506377215391-5d4a33e271b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhpc3RvcmljfGVufDB8fHx8MTY4OTE5Njg1MQ&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1474490357822-de5a871e3747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGhpc3RvcmljfGVufDB8fHx8MTY4OTE5Njg3MQ&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 200,
    discounted_price: 180,
  },
];
