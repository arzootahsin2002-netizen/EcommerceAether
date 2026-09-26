'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Shirt,
  Smartphone,
  Laptop,
  HeartHandshake,
  Home,
  Tv,
  Baby,
  Dumbbell,
  Armchair,
  BookOpen
} from 'lucide-react';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  tagline: string;
  badge?: string;
  subcategories: { name: string; slug: string; count: string }[];
  featuredProduct: {
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: string;
  };
  similarKeywords: string[];
}

export const CATEGORY_BAR_DATA: CategoryData[] = [
  {
    id: 'for-you',
    name: 'For You',
    slug: 'For You',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop',
    tagline: 'Curated recommendations & trending picks tailored to your style',
    badge: 'Popular',
    subcategories: [
      { name: 'Personalized Daily Picks', slug: 'For You', count: '48 items' },
      { name: 'Trending Flash Deals', slug: 'For You', count: '24 items' },
      { name: 'VIP Member Exclusives', slug: 'For You', count: '16 items' },
      { name: 'Top Rated 4.8★+ Wardrobe', slug: 'For You', count: '32 items' }
    ],
    featuredProduct: {
      name: 'Custom Tailored Capsule Edition',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
      price: 3499,
      originalPrice: 5999,
      discount: '42% OFF'
    },
    similarKeywords: ['Curated Picks', 'Daily Steals', 'VIP Access', 'Bestsellers']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop',
    tagline: "Men's, Women's, Footwear & Designer Luxury Wardrobe",
    badge: 'Trending',
    subcategories: [
      { name: "Men's Heavyweight Basics", slug: 'Men', count: '54 items' },
      { name: "Women's Sculptural Linen", slug: 'Women', count: '42 items' },
      { name: 'Cashmere & Wool Outerwear', slug: 'Outerwear', count: '28 items' },
      { name: 'Handcrafted Leather Boots', slug: 'Fashion', count: '19 items' }
    ],
    featuredProduct: {
      name: 'Heavyweight French Terry Hoodie (500 GSM)',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=400&auto=format&fit=crop',
      price: 3299,
      originalPrice: 4999,
      discount: '34% OFF'
    },
    similarKeywords: ['French Terry', 'Linen Shirts', 'Selvedge Denim', 'Merino Wool']
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    slug: 'Mobiles',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop',
    tagline: '5G Titanium Flagships, Foldables & MagSafe Accessories',
    badge: 'New 5G',
    subcategories: [
      { name: 'Titanium 5G Flagship Smartphones', slug: 'Mobiles', count: '30 items' },
      { name: 'Ultra-Slim Foldable Devices', slug: 'Mobiles', count: '12 items' },
      { name: 'MagSafe Armor Cases & Covers', slug: 'Mobiles', count: '65 items' },
      { name: '100W GaN Fast Chargers & Powerbanks', slug: 'Mobiles', count: '40 items' }
    ],
    featuredProduct: {
      name: 'Aether Apex 5G Smartphone (256GB OLED)',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop',
      price: 64999,
      originalPrice: 79999,
      discount: '18% OFF'
    },
    similarKeywords: ['OLED 120Hz', 'MagSafe', 'Titanium Frame', 'Snapdragon 8 Gen 3']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'Electronics',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop',
    tagline: 'Studio Noise-Cancelling Audio, Laptops & Smart Tech',
    badge: 'Hot',
    subcategories: [
      { name: 'Active Noise-Cancelling Headphones', slug: 'Electronics', count: '38 items' },
      { name: 'Slim M3 Silicon Ultrabooks', slug: 'Electronics', count: '22 items' },
      { name: '4K Ultra-Wide Studio Monitors', slug: 'Electronics', count: '15 items' },
      { name: 'Titanium Smartwatches & Health Bands', slug: 'Electronics', count: '29 items' }
    ],
    featuredProduct: {
      name: 'Acoustic Studio Pro Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
      price: 18499,
      originalPrice: 24999,
      discount: '26% OFF'
    },
    similarKeywords: ['Spatial Audio', 'OLED 4K', 'Hi-Res Lossless', '60hr Battery']
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'Beauty',
    icon: HeartHandshake,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop',
    tagline: 'Botanical Skincare, Niche Fragrances & Luxury Grooming',
    badge: 'Luxury',
    subcategories: [
      { name: 'Hyaluronic & Peptide Face Serums', slug: 'Beauty', count: '35 items' },
      { name: 'French Niche Eau De Parfum (100ml)', slug: 'Beauty', count: '24 items' },
      { name: 'Sandalwood Grooming & Beard Oils', slug: 'Beauty', count: '18 items' },
      { name: 'Clean Botanical Lip & Night Balms', slug: 'Beauty', count: '22 items' }
    ],
    featuredProduct: {
      name: 'Oud & Bergamot Reserve Eau De Parfum',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop',
      price: 4899,
      originalPrice: 6500,
      discount: '25% OFF'
    },
    similarKeywords: ['Oud Wood', 'Vitamin C', 'French Niche', 'Cruelty Free']
  },
  {
    id: 'home',
    name: 'Home',
    slug: 'Home',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop',
    tagline: 'Minimalist Ceramics, Sculptural Lighting & Organic Linen',
    badge: 'Artisan',
    subcategories: [
      { name: 'Warm Architectural Table Lamps', slug: 'Home', count: '27 items' },
      { name: 'Artisan Terracotta & Ceramic Vases', slug: 'Home', count: '34 items' },
      { name: 'Pure Belgian Washed Linen Throws', slug: 'Home', count: '19 items' },
      { name: 'Smoked Amber Scented Soy Candles', slug: 'Home', count: '25 items' }
    ],
    featuredProduct: {
      name: 'Minimalist Wabi-Sabi Ceramic Table Lamp',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop',
      price: 5299,
      originalPrice: 7999,
      discount: '33% OFF'
    },
    similarKeywords: ['Ceramics', 'Linen Throws', 'Wabi-Sabi', 'Amber Glass']
  },
  {
    id: 'appliances',
    name: 'Appliances',
    slug: 'Appliances',
    icon: Tv,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=300&auto=format&fit=crop',
    tagline: 'Smart Touchscreen Air Fryers, Espresso Tech & Purifiers',
    badge: 'Smart Tech',
    subcategories: [
      { name: 'Digital Touchscreen 6.5L Air Fryers', slug: 'Appliances', count: '16 items' },
      { name: 'Italian 15-Bar Precision Espresso Machines', slug: 'Appliances', count: '14 items' },
      { name: 'True HEPA Smart Room Air Purifiers', slug: 'Appliances', count: '20 items' },
      { name: 'LiDAR Smart Robot Vacuum Cleaners', slug: 'Appliances', count: '11 items' }
    ],
    featuredProduct: {
      name: 'Precision Barista Touch Espresso Machine',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=400&auto=format&fit=crop',
      price: 28999,
      originalPrice: 38999,
      discount: '25% OFF'
    },
    similarKeywords: ['15-Bar Pump', 'HEPA Filter', 'Touchscreen Air Fryer', 'Dual Boiler']
  },
  {
    id: 'toys-and-baby',
    name: 'Toys and Baby',
    slug: 'Toys & Baby',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=300&auto=format&fit=crop',
    tagline: 'Montessori Wooden Sets, STEM Robotics & Baby Care',
    badge: 'Eco Safe',
    subcategories: [
      { name: 'Solid Beechwood Montessori Blocks', slug: 'Toys & Baby', count: '26 items' },
      { name: 'STEM Programmable Robotics Kits', slug: 'Toys & Baby', count: '18 items' },
      { name: 'Organic Bamboo Muslin Swaddle Blankets', slug: 'Toys & Baby', count: '30 items' },
      { name: 'Collectible Mechanical Metal Models', slug: 'Toys & Baby', count: '15 items' }
    ],
    featuredProduct: {
      name: 'Architectural Geometric Wooden Building Set',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=400&auto=format&fit=crop',
      price: 2499,
      originalPrice: 3999,
      discount: '37% OFF'
    },
    similarKeywords: ['Montessori', 'Non-Toxic', 'Organic Cotton', 'STEM Learning']
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'Sports',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop',
    tagline: 'Carbon Rackets, High-Density Yoga Mats & Athletic Gear',
    badge: 'Pro Grade',
    subcategories: [
      { name: 'High-Density Non-Slip 6mm Yoga Mats', slug: 'Sports', count: '22 items' },
      { name: 'Full Carbon Fiber Pro Tennis Rackets', slug: 'Sports', count: '14 items' },
      { name: 'Double-Walled Insulated Workout Flasks', slug: 'Sports', count: '35 items' },
      { name: 'Reinforced Adjustable Dumbbell Sets', slug: 'Sports', count: '18 items' }
    ],
    featuredProduct: {
      name: 'Aerodynamic Pro Carbon Fiber Tennis Racket',
      image: 'https://images.unsplash.com/photo-1617083934555-563d3c8c7d5c?q=80&w=400&auto=format&fit=crop',
      price: 8999,
      originalPrice: 12999,
      discount: '30% OFF'
    },
    similarKeywords: ['Carbon Fiber', 'Non-Slip Grip', 'Insulated Steel', 'Ergonomic']
  },
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'Furniture',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop',
    tagline: 'Solid White Oak, Velvet Accent Chairs & Motorized Desks',
    badge: 'Bespoke',
    subcategories: [
      { name: 'Curved Bouclé & Velvet Accent Chairs', slug: 'Furniture', count: '18 items' },
      { name: 'Solid White Oak Scandinavian Tables', slug: 'Furniture', count: '14 items' },
      { name: 'Dual-Motor Electric Standing Desks', slug: 'Furniture', count: '12 items' },
      { name: 'Minimalist Japandi Platform Bed Frames', slug: 'Furniture', count: '9 items' }
    ],
    featuredProduct: {
      name: 'Curved Bouclé Minimalist Accent Lounge Chair',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop',
      price: 21999,
      originalPrice: 32999,
      discount: '33% OFF'
    },
    similarKeywords: ['Solid Oak', 'Bouclé Fabric', 'Ergonomic', 'Japandi Minimalist']
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'Books',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop',
    tagline: 'Architecture Hardcovers, Design Monographs & Bestsellers',
    badge: 'Hardcover',
    subcategories: [
      { name: 'Monographs: Modern Architecture & Design', slug: 'Books', count: '28 items' },
      { name: 'Award-Winning International Fiction', slug: 'Books', count: '45 items' },
      { name: 'Typography, Branding & Graphic Arts', slug: 'Books', count: '19 items' },
      { name: 'Philosophy, Mindset & High Performance', slug: 'Books', count: '32 items' }
    ],
    featuredProduct: {
      name: 'Architectural Minimal: Pure Geometry in Form',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
      price: 2899,
      originalPrice: 4200,
      discount: '31% OFF'
    },
    similarKeywords: ['Clothbound', 'High GSM Art Paper', 'Gold Foil', 'Collector Edition']
  }
];

export function CategoryBar() {
  return (
    <section className="bg-white border-b border-zinc-200/80 shadow-2xs relative z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Horizontal Category Strip (Clean, direct clickable navigation without hover popups) */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 sm:py-3 gap-1 sm:gap-2">
          {CATEGORY_BAR_DATA.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/shop?category=${encodeURIComponent(category.slug)}`}
                className="group flex flex-col items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-2xl text-center select-none shrink-0 hover:bg-zinc-50 transition-all duration-200"
                title={`Explore ${category.name}`}
              >
                {/* Category Circular Thumbnail */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 group-hover:border-zinc-950 group-hover:shadow-sm transition-all">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-108 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-800 shadow-xs">
                    <Icon className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Category Title */}
                <span className="text-[11px] sm:text-xs font-bold text-zinc-700 group-hover:text-zinc-950 whitespace-nowrap transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
