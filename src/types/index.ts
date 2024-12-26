type SalonType = {
	name: string;
	address: string;
	rating: number;
	image: string;
};

interface SelfcareItemsType {
	_id: string;
	title: string;
	price: number;
	discountPercent?: number;
	rating: number;
	image: string;
}

type CardType = {
	top?: {
		left?: React.ReactNode;
		right?: React.ReactNode;
		full?: React.ReactNode;
	};
	bottom?: {
		left?: React.ReactNode;
		right?: React.ReactNode;
		full?: React.ReactNode;
	};
	actionBtn: {
		left?: React.ReactNode;
		right?: React.ReactNode;
		full?: React.ReactNode;
	};
	image: JSX.Element | null;
	border?: boolean;
	bgColor?:
		| "primary"
		| "secondary"
		| "accent"
		| "black"
		| "white"
		| "neutral"
		| "base-100"
		| "base-200"
		| "base-300";
};
type ProductCardType = {
	title: string;
	price: number;
	iconCart: React.ReactNode; // jsx
	reviewText: string;
	actionBtnText: string;
	image: string;
};
type ProductCardBudgetFriendlyType = {
	title: string;
	price: number;
	discountedPrice: number;
	iconCart: React.ReactNode; // jsx
	flatOff: number;
	actionBtnText: string;
	image: string;
};
type ReviewType = {
	stars: number;
	title: string;
	description: string;
	image: string;
	name: string;
	city: string;
};
type AreaType = {
	salons: string[];
	city: string;
};

interface ProductType {
	_id?: string;
	title: string;
	description: string;
	image: string;
	howToUse: string;
	maxAllowedInCart: number;
	rating: number;
	price: number;
	discountPercent?: number;
	salonRefId?: string;
	variations: {
		title: string;
		variationList: string[];
	}[];
}
interface CartItem {
	id: string;
	quantity: number;
	title: string;
	image: string;
	netPrice: number;
	maxAllowedInCart: number;
	selectedVariations?: {
		title: string;
		variationListItem: string;
	}[];
}
export type {
	ProductType,
	CartItem,
	SalonType,
	CardType,
	SelfcareItemsType,
	ReviewType,
	ProductCardType,
	ProductCardBudgetFriendlyType,
	AreaType,
};
