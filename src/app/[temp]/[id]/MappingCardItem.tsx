import { useCartStoreContext } from "@/store/cartStoreContext";

interface CartItem {
  id: string;
  title: string;
  image: string;
  netPrice: number;
  quantity: number;
  maxAllowedInCart: number;
}

interface Product {
  name: string;
  image1: string;
  discounted_price: number;
}

export const MappingCardItem = (
  product: Product,
  cartItems: CartItem[],
  addItem: (item: CartItem) => void
) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === product.name);
  
  const totalQuantity = cartItems.reduce((sum: number, cartItem: CartItem) => sum + cartItem.quantity, 0);

  if (totalQuantity >= 5) {
    alert("You can only add up to 5 items in the cart.");
    return;
  }

  if (existingItem) {
    alert(`${product.name} is already in the cart.`);
    return;
  }

  const cartItem: CartItem = {
    id: product.name,
    title: product.name,
    image: product.image1,
    netPrice: product.discounted_price,
    quantity: 1,
    maxAllowedInCart: 5,
  };

  addItem(cartItem);
};
