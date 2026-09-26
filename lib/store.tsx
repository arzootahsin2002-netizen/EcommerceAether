'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, SavedAddress, Order, UserProfile, Coupon, Review } from './types';
import { INITIAL_PRODUCTS, VALID_COUPONS } from './products-data';
import { generateOrderId } from './utils';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'error' | 'warning';
  image?: string;
}

interface AppContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  cart: CartItem[];
  savedForLater: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: SavedAddress[];
  user: UserProfile | null;
  activeCoupon: Coupon | null;
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];
  
  // Actions
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, newQuantity: number) => void;
  clearCart: () => void;
  
  saveForLater: (item: CartItem) => void;
  moveToCartFromSaved: (item: CartItem) => void;
  removeSavedForLater: (productId: string, selectedSize: string, selectedColor: string) => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  addAddress: (address: Omit<SavedAddress, 'id'>) => SavedAddress;
  updateAddress: (address: SavedAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  placeOrder: (shippingAddress: SavedAddress, paymentMethod: Order['paymentMethod'], shippingMethod: Order['shippingMethod']) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  
  setIsCartDrawerOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Computed values
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Raghav Kashyap',
  email: 'raghav.k@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Raghav Kashyap',
      phone: '+91 98765 43210',
      streetAddress: '402, Signature Palms, 12th Main Road, Indiranagar',
      apartment: 'Flat 402, Block B',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      country: 'India',
      isDefault: true,
      addressType: 'Home'
    },
    {
      id: 'addr-2',
      fullName: 'Raghav Kashyap',
      phone: '+91 98765 43210',
      streetAddress: 'WeWork Galaxy, 43 Residency Rd, Shanthala Nagar',
      apartment: 'Floor 5, Desk 502',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560025',
      country: 'India',
      isDefault: false,
      addressType: 'Work'
    }
  ],
  savedPaymentMethods: [
    {
      id: 'pay-1',
      type: 'Card',
      title: 'HDFC Millennia Credit Card',
      details: '•••• •••• •••• 4892',
      expiry: '08/28',
      isDefault: true
    },
    {
      id: 'pay-2',
      type: 'UPI',
      title: 'Google Pay UPI',
      details: 'raghavk@okhdfcbank',
      isDefault: false
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-001', 'prod-004']);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>(DEFAULT_USER.addresses);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('aether_cart');
      const storedWishlist = localStorage.getItem('aether_wishlist');
      const storedOrders = localStorage.getItem('aether_orders');
      const storedAddresses = localStorage.getItem('aether_addresses');
      const storedProducts = localStorage.getItem('aether_products');
      const storedSaved = localStorage.getItem('aether_saved');

      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = INITIAL_PRODUCTS.map((initProd) => {
            const existing = parsed.find((p) => p.id === initProd.id);
            if (existing) {
              return {
                ...existing,
                images: initProd.images,
                colors: initProd.colors
              };
            }
            return initProd;
          });
          const custom = parsed.filter((p) => !INITIAL_PRODUCTS.some((ip) => ip.id === p.id));
          setProducts([...merged, ...custom]);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          const updatedCart = parsedCart.map((item) => {
            const currentProd = INITIAL_PRODUCTS.find((p) => p.id === item.productId);
            if (currentProd) {
              return {
                ...item,
                product: {
                  ...item.product,
                  images: currentProd.images
                }
              };
            }
            return item;
          });
          setCart(updatedCart);
        }
      }
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
      if (storedSaved) setSavedForLater(JSON.parse(storedSaved));
    } catch (e) {
      console.error('Failed to load storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aether_cart', JSON.stringify(cart));
      localStorage.setItem('aether_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('aether_orders', JSON.stringify(orders));
      localStorage.setItem('aether_addresses', JSON.stringify(addresses));
      localStorage.setItem('aether_products', JSON.stringify(products));
      localStorage.setItem('aether_saved', JSON.stringify(savedForLater));
    } catch (e) {
      console.error('Failed to save storage', e);
    }
  }, [cart, wishlist, orders, addresses, products, savedForLater, isLoaded]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            selectedSize,
            selectedColor,
            quantity,
            unitPrice: product.price
          }
        ];
      }
    });

    showToast({
      title: 'Added to Bag',
      message: `${product.name} (${selectedSize} / ${selectedColor})`,
      type: 'success',
      image: product.images[0]
    });
  };

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
      )
    );
    showToast({
      title: 'Removed from Bag',
      type: 'info'
    });
  };

  const updateQuantity = (productId: string, selectedSize: string, selectedColor: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const saveForLater = (item: CartItem) => {
    removeFromCart(item.productId, item.selectedSize, item.selectedColor);
    setSavedForLater((prev) => [...prev, item]);
    showToast({
      title: 'Saved for later',
      message: item.product.name,
      type: 'info'
    });
  };

  const moveToCartFromSaved = (item: CartItem) => {
    setSavedForLater((prev) =>
      prev.filter(
        (i) => !(i.productId === item.productId && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor)
      )
    );
    addToCart(item.product, item.selectedSize, item.selectedColor, item.quantity);
  };

  const removeSavedForLater = (productId: string, selectedSize: string, selectedColor: string) => {
    setSavedForLater((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.selectedSize === selectedSize && i.selectedColor === selectedColor)
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    const isWished = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);

    if (isWished) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast({
        title: 'Removed from Wishlist',
        message: product?.name,
        type: 'info'
      });
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast({
        title: 'Saved to Wishlist',
        message: product?.name,
        type: 'success',
        image: product?.images[0]
      });
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast({
        title: 'Invalid Coupon',
        message: 'The entered coupon code is invalid or expired.',
        type: 'error'
      });
      return { success: false, message: 'Invalid promo code' };
    }

    if (cartSubtotal < found.minSpend) {
      const msg = `Min. spend of ₹${found.minSpend} required for this code.`;
      showToast({
        title: 'Coupon Requirement Not Met',
        message: msg,
        type: 'warning'
      });
      return { success: false, message: msg };
    }

    setActiveCoupon(found);
    showToast({
      title: 'Coupon Applied!',
      message: `${found.code} saved you money!`,
      type: 'success'
    });
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast({
      title: 'Coupon Removed',
      type: 'info'
    });
  };

  const addAddress = (address: Omit<SavedAddress, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const newAddr: SavedAddress = { ...address, id };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddr];
      }
      return [...prev, newAddr];
    });
    return newAddr;
  };

  const updateAddress = (address: SavedAddress) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === address.id) return address;
        if (address.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast({
      title: 'Product Added to Catalog',
      message: product.name,
      type: 'success'
    });
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    showToast({
      title: 'Product Updated',
      message: product.name,
      type: 'success'
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast({
      title: 'Product Removed',
      type: 'info'
    });
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const newAvgRating = +(
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...prod,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: newAvgRating
          };
        }
        return prod;
      })
    );

    showToast({
      title: 'Review Submitted',
      message: 'Thank you for your valuable feedback!',
      type: 'success'
    });
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * activeCoupon.value) / 100);
    }
    return activeCoupon.value;
  }, [cartSubtotal, activeCoupon]);

  const cartShipping = useMemo(() => {
    if (cartSubtotal === 0 || cartSubtotal >= 1999) return 0;
    return 99;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    const total = cartSubtotal - cartDiscount + cartShipping;
    return Math.max(0, total);
  }, [cartSubtotal, cartDiscount, cartShipping]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const placeOrder = (
    shippingAddress: SavedAddress,
    paymentMethod: Order['paymentMethod'],
    shippingMethod: Order['shippingMethod']
  ) => {
    const orderNumber = generateOrderId();
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress,
      shippingMethod,
      paymentMethod,
      pricing: {
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: shippingMethod.cost,
        tax: 0,
        total: cartSubtotal - cartDiscount + shippingMethod.cost,
        couponCode: activeCoupon?.code
      },
      status: 'Order Placed',
      trackingNumber: `AETH-IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      carrier: 'BlueDart Express Air',
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }),
          description: 'Your order has been confirmed and received by our fulfillment center.',
          completed: true
        },
        {
          status: 'Processing',
          timestamp: 'Pending',
          description: 'Quality inspection and bespoke packaging.',
          completed: false
        },
        {
          status: 'Shipped',
          timestamp: 'Expected within 24h',
          description: 'Handed over to BlueDart Express courier.',
          completed: false
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Expected Delivery in 2-3 days',
          description: 'Delivery agent assigned for doorstep delivery.',
          completed: false
        },
        {
          status: 'Delivered',
          timestamp: 'Estimated ' + shippingMethod.estimatedDelivery,
          description: 'Package delivered with OTP confirmation.',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = order.timeline.map((event) => {
            if (event.status === status) {
              return {
                ...event,
                completed: true,
                timestamp: new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
              };
            }
            return event;
          });
          return { ...order, status, timeline: updatedTimeline };
        }
        return order;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        savedForLater,
        wishlist,
        orders,
        addresses,
        user,
        activeCoupon,
        isCartDrawerOpen,
        quickViewProduct,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCartFromSaved,
        removeSavedForLater,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        placeOrder,
        updateOrderStatus,
        addReview,
        setIsCartDrawerOpen,
        setQuickViewProduct,
        showToast,
        removeToast,
        cartCount,
        wishlistCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
