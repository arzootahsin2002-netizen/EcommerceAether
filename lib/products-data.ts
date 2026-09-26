import { Product, Coupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'heavyweight-oversized-french-terry-hoodie',
    name: 'Heavyweight French Terry Oversized Hoodie',
    brand: 'AETHER STUDIO',
    tagline: '500 GSM loopback cotton with drop-shoulder silhouette',
    description: 'Engineered from ultra-dense 500 GSM custom-knit French Terry, this hoodie delivers structured drape, ribbed side gussets, and seamless double-layered hood without drawstrings for a sleek minimalist aesthetic.',
    longDescription: 'Crafted with obsessive attention to proportion and weight, our signature French Terry Hoodie is pre-shrunk and garment-dyed for a lived-in luxury texture. Featuring reinforced twin-needle stitching throughout, deep kangaroo pocket with concealed interior key pocket, and elasticated ribbed hems that sit cleanly without bunching.',
    price: 3299,
    originalPrice: 4999,
    discountPercentage: 34,
    category: 'Men',
    subcategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#18181B', imageIndex: 0 },
      { name: 'Warm Taupe', hex: '#8B7765', imageIndex: 1 },
      { name: 'Heather Charcoal', hex: '#3F3F46', imageIndex: 2 },
      { name: 'Vintage Washed Olive', hex: '#55594C', imageIndex: 3 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Organic Loopback Cotton', 'Custom 500 GSM Fabric', 'Pre-shrunk Garment Dyed'],
    fabricCare: [
      'Machine wash cold gentle cycle (max 30°C)',
      'Do not bleach',
      'Lay flat to dry to preserve silhouette',
      'Warm iron if necessary on reverse'
    ],
    features: [
      '500 GSM custom heavyweight cotton knit',
      'Double-layer structured minimalist hood (no drawstrings)',
      'Side ribbed panels for ease of motion',
      'Concealed inner kangaroo phone pocket',
      'Handcrafted in artisanal batches'
    ],
    stock: 24,
    rating: 4.9,
    reviewsCount: 342,
    sku: 'AETH-HD-001',
    isBestSeller: true,
    isFeatured: true,
    isDealOfTheDay: true,
    dealEndTime: '2026-10-01T23:59:59Z',
    fit: 'Oversized',
    modelInfo: 'Model is 6\'1" (185cm), 76kg, wearing size L',
    reviews: [
      {
        id: 'rev-101',
        userName: 'Aarav Malhotra',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '2 days ago',
        title: 'Best heavyweight hoodie on the market. Unbelievable drape.',
        comment: 'The weight of this 500 GSM fabric is incredible. Stays boxy and doesn’t sag after washing. The taupe color in person has this subtle muted earth tone that looks straight off a luxury runway.',
        verifiedPurchase: true,
        helpfulCount: 48,
        sizePurchased: 'L',
        colorPurchased: 'Warm Taupe'
      },
      {
        id: 'rev-102',
        userName: 'Vikram Sethi',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '1 week ago',
        title: 'Cleanest hood construction without strings',
        comment: 'The double layer hood actually stands upright without needing drawstring cords. Premium details and very cozy loopback interior.',
        verifiedPurchase: true,
        helpfulCount: 22,
        sizePurchased: 'XL',
        colorPurchased: 'Onyx Black'
      }
    ]
  },
  {
    id: 'prod-002',
    slug: 'pure-italian-linen-relaxed-resort-shirt',
    name: 'Pure Italian Linen Relaxed Camp Collar Shirt',
    brand: 'AETHER STUDIO',
    tagline: '100% Breathable European Flax with Mother-of-Pearl buttons',
    description: 'Woven from long-staple French & Italian flax, this relaxed open camp-collar shirt ensures effortless airflow during warm days while maintaining an elevated tailoring contour.',
    longDescription: 'Lightweight yet structured, our resort linen shirt is enzyme-washed for supreme softness from day one. Features genuine Trocas shell buttons, French seams throughout, straight-hem finish with subtle side splits designed for wearing both untucked and tucked.',
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 38,
    category: 'Men',
    subcategory: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620012253295-c15c429fccf8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Sand Ecru', hex: '#E6DEC8', imageIndex: 0 },
      { name: 'Azure Sky', hex: '#93C5FD', imageIndex: 1 },
      { name: 'Olive Green', hex: '#4B5320', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['100% Certified European Flax Linen', 'Natural Mother of Pearl Buttons'],
    fabricCare: [
      'Hand wash or machine wash on delicate cold',
      'Line dry in shade',
      'Steam iron while slightly damp'
    ],
    features: [
      '160 GSM lightweight pure breathable linen',
      'Relaxed camp collar with notched lapels',
      'Natural shell buttons with cross-stitching',
      'Straight hem with side vents'
    ],
    stock: 18,
    rating: 4.8,
    reviewsCount: 215,
    sku: 'AETH-SH-002',
    isNewArrival: true,
    isFeatured: true,
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 6\'0" wearing size M',
    reviews: [
      {
        id: 'rev-201',
        userName: 'Rohan Deshmukh',
        rating: 5,
        date: '3 days ago',
        title: 'Perfect linen shirt for vacation & evenings',
        comment: 'Breathability is top tier. Doesn’t wrinkle excessively like cheap linen. The sand color is stunning.',
        verifiedPurchase: true,
        helpfulCount: 15,
        sizePurchased: 'M',
        colorPurchased: 'Sand Ecru'
      }
    ]
  },
  {
    id: 'prod-003',
    slug: 'wide-leg-pleated-tailored-trousers',
    name: 'Architectural Pleated Wide-Leg Trousers',
    brand: 'AETHER TAILORING',
    tagline: 'Wool-blend fluid drape with deep front double pleats',
    description: 'A modern silhouette featuring double forward pleats, extended tab waistband, and side adjusters. Cut with a generous wide leg that falls cleanly over boots or sneakers.',
    longDescription: 'Engineered for versatility, these trousers balance bespoke tailoring with contemporary streetwear ease. Made with crease-resistant tropical wool twill blend with concealed hook-and-bar closure and deep slant pockets.',
    price: 3799,
    originalPrice: 5999,
    discountPercentage: 37,
    category: 'Unisex',
    subcategory: 'Trousers & Pants',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Twill', hex: '#27272A', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#3E2723', imageIndex: 1 },
      { name: 'Camel', hex: '#C19A6B', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['65% Tropical Wool', '33% Recycled Poly', '2% Elastane'],
    fabricCare: ['Dry clean only or cold gentle hand wash', 'Iron with pressing cloth'],
    features: [
      'Double forward pleats for relaxed voluminous silhouette',
      'Side waist adjusters for custom tailored fit without belt',
      'Half lined with silky cupro for skin comfort',
      'Unfinished hem length option for tailored precision'
    ],
    stock: 14,
    rating: 4.7,
    reviewsCount: 189,
    sku: 'AETH-TR-003',
    isBestSeller: true,
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 5\'11" wearing size S / 30',
    reviews: [
      {
        id: 'rev-301',
        userName: 'Priya Nambiar',
        rating: 5,
        date: '5 days ago',
        title: 'The drape on these trousers is out of this world',
        comment: 'I wear them high-waisted with a fitted knit top. The fabric is heavy enough to fall beautifully without creasing when sitting down.',
        verifiedPurchase: true,
        helpfulCount: 39,
        sizePurchased: 'S',
        colorPurchased: 'Charcoal Twill'
      }
    ]
  },
  {
    id: 'prod-004',
    slug: 'heavyweight-280gsm-box-tee',
    name: '280 GSM Structured Compact Boxy T-Shirt',
    brand: 'AETHER BASICS',
    tagline: 'High-density combed Supima cotton with thick 1-inch rib collar',
    description: 'The definitive daily t-shirt. Cut in a contemporary boxy fit with dropped shoulders and a dense 280 GSM jersey that holds its form all day without sticking.',
    longDescription: 'Zero transparency, zero shrinkage. We knitted long-staple Supima cotton into a tight interlock jersey with silky silicone bio-wash finish. Reinforced tight collar that never sags after dozens of wash cycles.',
    price: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    category: 'Men',
    subcategory: 'T-Shirts',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Vintage White', hex: '#F4F4F5', imageIndex: 0 },
      { name: 'Obsidian Black', hex: '#09090B', imageIndex: 1 },
      { name: 'Sage Green', hex: '#879782', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Long-Staple Supima Cotton', '280 GSM Interlock Knit'],
    fabricCare: ['Machine wash cold inside out', 'Tumble dry low or air dry in shade'],
    features: [
      '280 GSM heavyweight zero-see-through cotton',
      '1.25" sturdy rib collar with lycra core to prevent frying',
      'Boxy drop-shoulder cut',
      'Bio-polished finish for velvet-smooth touch'
    ],
    stock: 55,
    rating: 4.9,
    reviewsCount: 680,
    sku: 'AETH-TS-004',
    isBestSeller: true,
    isFeatured: true,
    isDealOfTheDay: true,
    dealEndTime: '2026-10-02T23:59:59Z',
    fit: 'Boxy Fit',
    modelInfo: 'Model is 6\'2" wearing size L',
    reviews: [
      {
        id: 'rev-401',
        userName: 'Kunal Roy',
        rating: 5,
        date: '1 day ago',
        title: 'I bought 5 of these. Better than high-end designer blanks.',
        comment: 'The collar stays completely flat and snug. The thickness of the 280 GSM gives it a premium silhouette that doesn’t cling to your body.',
        verifiedPurchase: true,
        helpfulCount: 64,
        sizePurchased: 'L',
        colorPurchased: 'Vintage White'
      }
    ]
  },
  {
    id: 'prod-005',
    slug: 'double-breasted-oversized-wool-coat',
    name: 'Minimalist Double-Breasted Cashmere-Wool Overcoat',
    brand: 'AETHER LUXE',
    tagline: 'Italian double-faced Melton wool with relaxed dropped tailoring',
    description: 'An iconic outerwear statement designed with clean proportions, concealed horn button placket, broad notch lapels, and deep welt pockets.',
    longDescription: 'Crafted from 700 GSM virgin Melton wool infused with 10% pure Mongolian cashmere for supreme warmth without cumbersome bulk. Fully lined in cupro satin with interior chest security pockets.',
    price: 7999,
    originalPrice: 12999,
    discountPercentage: 38,
    category: 'Outerwear',
    subcategory: 'Jackets & Coats',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#B89778', imageIndex: 0 },
      { name: 'Midnight Charcoal', hex: '#1C1917', imageIndex: 1 },
      { name: 'Deep Moss', hex: '#3B413C', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['90% Virgin Melton Wool', '10% Mongolian Cashmere', '100% Cupro Lining'],
    fabricCare: ['Specialist dry clean only', 'Store on broad structured cedar hanger'],
    features: [
      '700 GSM cold-proof Italian Melton wool blend',
      'Subtle double-breasted 6-button closure',
      'Extended rear walking vent for mobility',
      'Interior passport & phone zip pockets'
    ],
    stock: 9,
    rating: 4.9,
    reviewsCount: 124,
    sku: 'AETH-CT-005',
    isNewArrival: true,
    fit: 'Oversized',
    modelInfo: 'Model is 5\'10" wearing size M',
    reviews: [
      {
        id: 'rev-501',
        userName: 'Devansh K.',
        rating: 5,
        date: '1 week ago',
        title: 'Investment piece that looks like ₹40,000 coat',
        comment: 'The cashmere blend gives it a subtle sheen and soft hand-feel. Keeps you warm in sub-10° weather effortlessly.',
        verifiedPurchase: true,
        helpfulCount: 31,
        sizePurchased: 'L',
        colorPurchased: 'Camel Tan'
      }
    ]
  },
  {
    id: 'prod-006',
    slug: 'chunky-ribbed-merino-wool-knit-sweater',
    name: 'Chunky Ribbed 100% Extra-Fine Merino Sweater',
    brand: 'AETHER KNITWEAR',
    tagline: '5-gauge heavyweight Fisherman knit with raglan sleeves',
    description: 'Spun from 19.5-micron non-mulesed Australian Merino wool. Offers supreme thermal regulation, itch-free comfort, and traditional half-cardigan stitch texture.',
    longDescription: 'A winter essential knitted with heavy 5-gauge yarn for tactile richness. Finished with chunky 2x2 ribbed cuffs, hem, and mock crew collar that stays snug.',
    price: 3499,
    originalPrice: 5499,
    discountPercentage: 36,
    category: 'Unisex',
    subcategory: 'Knitwear & Sweaters',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#DDD0C0', imageIndex: 0 },
      { name: 'Forest Green', hex: '#233827', imageIndex: 1 },
      { name: 'Navy Blue', hex: '#1B2430', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Extra-fine 19.5µ Merino Wool'],
    fabricCare: ['Hand wash cold with wool detergent', 'Dry flat on clean towel', 'Never hang wet'],
    features: [
      '5-gauge dense cardigan stitch',
      '100% natural thermoregulating Merino',
      'Raglan sleeves for natural shoulder drape',
      'Zero-pill yarn treatment'
    ],
    stock: 15,
    rating: 4.8,
    reviewsCount: 167,
    sku: 'AETH-KW-006',
    isBestSeller: true,
    fit: 'Regular Fit',
    modelInfo: 'Model is 5\'9" wearing size S',
    reviews: [
      {
        id: 'rev-601',
        userName: 'Sanya Gupta',
        rating: 5,
        date: '4 days ago',
        title: 'Incredibly soft, not itchy at all!',
        comment: 'I usually have sensitive skin with wool, but this merino is velvety smooth. The oatmeal color pairs with everything.',
        verifiedPurchase: true,
        helpfulCount: 29,
        sizePurchased: 'S',
        colorPurchased: 'Oatmeal Heather'
      }
    ]
  },
  {
    id: 'prod-007',
    slug: 'japanese-selvedge-relaxed-tapered-denim',
    name: '14oz Kurabo Japanese Selvedge Relaxed Jeans',
    brand: 'AETHER DENIM',
    tagline: 'Raw red-line selvedge denim woven on vintage shuttle looms',
    description: 'Woven in Okayama, Japan using 100% American long-staple cotton and natural indigo rope dyeing. Designed in a relaxed tapered cut with high rise.',
    longDescription: 'Unwashed raw selvedge denim that shapes to your body with wear, developing unique personal honeycombs and whiskers. Features custom debossed copper rivets, button fly, and genuine bridle leather waistband patch.',
    price: 4499,
    originalPrice: 6999,
    discountPercentage: 35,
    category: 'Men',
    subcategory: 'Jeans & Denim',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1E293B', imageIndex: 0 },
      { name: 'Washed Bleach Blue', hex: '#87A2FB', imageIndex: 1 },
      { name: 'Faded Black', hex: '#2C2C2C', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['100% Japanese Kurabo Cotton Selvedge', '14.25oz Heavyweight Denim'],
    fabricCare: ['Wear for 6 months before first wash', 'Soak inside out in cold water with mild detergent'],
    features: [
      'Red-line selvedge ID visible on cuff turn-up',
      'Vintage shuttle loom woven texture',
      'Solid copper hardware and chainstitched hem',
      'Vegetable-tanned leather back patch'
    ],
    stock: 20,
    rating: 4.9,
    reviewsCount: 298,
    sku: 'AETH-DN-007',
    isFeatured: true,
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 6\'1" wearing size 32 / M',
    reviews: [
      {
        id: 'rev-701',
        userName: 'Aditya Verma',
        rating: 5,
        date: '2 weeks ago',
        title: 'Authentic selvedge at an unbelievable price',
        comment: 'The shuttle loom chatter and neppy texture are unmistakable. The cut gives plenty of thigh room while tapering neatly at the ankle.',
        verifiedPurchase: true,
        helpfulCount: 42,
        sizePurchased: 'M',
        colorPurchased: 'Raw Deep Indigo'
      }
    ]
  },
  {
    id: 'prod-008',
    slug: 'sculptural-wrap-linen-midi-dress',
    name: 'Sculptural Linen Wrap Midi Dress',
    brand: 'AETHER FEMME',
    tagline: 'Asymmetrical drape with adjustable tie waist and deep side pockets',
    description: 'A contemporary silhouette engineered in airy European linen with structured wrap front, kimono-inspired sleeves, and flowy calf-length hemline.',
    longDescription: 'Effortlessly transitions from sunlit weekend brunch to gallery evenings. Enzyme softened linen creates an organic, breathable drape that moves gracefully with every step.',
    price: 3699,
    originalPrice: 5999,
    discountPercentage: 38,
    category: 'Women',
    subcategory: 'Dresses & Co-ords',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Terracotta Rust', hex: '#B85D43', imageIndex: 0 },
      { name: 'Olive Khaki', hex: '#606C38', imageIndex: 1 },
      { name: 'Clean Ivory', hex: '#FDFBF7', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Belgian Flax Linen (200 GSM)'],
    fabricCare: ['Machine wash gentle in cold water', 'Hang dry in shaded area', 'Steam lightly'],
    features: [
      'Adjustable internal & external wrap ties for custom fit',
      'Deep functional side seam pockets',
      'Subtle V-neckline with modesty button',
      'Breathable all-natural fiber'
    ],
    stock: 12,
    rating: 4.8,
    reviewsCount: 145,
    sku: 'AETH-DR-008',
    isNewArrival: true,
    isFeatured: true,
    fit: 'Regular Fit',
    modelInfo: 'Model is 5\'8" wearing size S',
    reviews: [
      {
        id: 'rev-801',
        userName: 'Meera Kapoor',
        rating: 5,
        date: '4 days ago',
        title: 'Gets compliments everywhere I wear it',
        comment: 'The wrap stays secure and the linen has substantial weight so it is not sheer at all. Terracotta shade is gorgeous.',
        verifiedPurchase: true,
        helpfulCount: 19,
        sizePurchased: 'S',
        colorPurchased: 'Terracotta Rust'
      }
    ]
  },
  {
    id: 'prod-009',
    slug: 'waterproof-tactical-modular-shell-jacket',
    name: '3-Layer StormProof Modular Tactical Shell',
    brand: 'AETHER TECHWEAR',
    tagline: '20,000mm waterproof breathable membrane with magnetic pocket flaps',
    description: 'Built for urban downpours and mountain trails. Fully seam-taped 3-layer nylon ripstop with storm hood, YKK AquaGuard zips, and ergonomic articulated sleeves.',
    longDescription: 'Combines technical outdoor endurance with sleek architectural city lines. Includes underarm zippered ventilation pits, fidlock magnetic cargo pockets, and adjustable cinch cords at the hood and waist.',
    price: 5499,
    originalPrice: 8999,
    discountPercentage: 38,
    category: 'Outerwear',
    subcategory: 'Jackets & Coats',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827', imageIndex: 0 },
      { name: 'Slate Grey', hex: '#64748B', imageIndex: 1 },
      { name: 'Cyber Olive', hex: '#414833', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['3-Layer Recycled Ripstop Nylon', '20k/20k Hydrophobic Membrane'],
    fabricCare: ['Wipe clean with wet cloth', 'Machine wash gentle with tech wash detergent'],
    features: [
      '20,000mm waterproof & windproof rating',
      'YKK AquaGuard waterproof seam-sealed zippers',
      'Dual underarm heat-release ventilation vents',
      'Helmet-compatible 3D adjustable hood'
    ],
    stock: 11,
    rating: 4.9,
    reviewsCount: 178,
    sku: 'AETH-JK-009',
    isDealOfTheDay: true,
    dealEndTime: '2026-09-30T23:59:59Z',
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 6\'1" wearing size L',
    reviews: [
      {
        id: 'rev-901',
        userName: 'Zaid Alvi',
        rating: 5,
        date: '6 days ago',
        title: 'Rode bike in torrential monsoon rain — completely dry',
        comment: 'Every seam is taped. The hood stays on tight even against heavy wind. Technical precision at its finest.',
        verifiedPurchase: true,
        helpfulCount: 51,
        sizePurchased: 'L',
        colorPurchased: 'Stealth Black'
      }
    ]
  },
  {
    id: 'prod-010',
    slug: 'heavyweight-waffle-knit-thermal-crewneck',
    name: '350 GSM Heavy Waffle-Knit Thermal Longsleeve',
    brand: 'AETHER BASICS',
    tagline: 'Honeycomb textured pure organic cotton for warmth and depth',
    description: 'An elevated cold-weather staple featuring a dimensional 350 GSM waffle weave that traps air pockets for natural insulation.',
    longDescription: 'Reinforced with thick ribbed neckband, elongated cuff ribs designed to stay put when layered under jackets, and flatlock anti-chafing interior seams.',
    price: 1899,
    originalPrice: 2799,
    discountPercentage: 32,
    category: 'Men',
    subcategory: 'T-Shirts',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Chalk Cream', hex: '#F5F5DC', imageIndex: 0 },
      { name: 'Charcoal Wash', hex: '#374151', imageIndex: 1 },
      { name: 'Warm Clay', hex: '#9C6644', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Organic Combed Cotton', '350 GSM Waffle Knit'],
    fabricCare: ['Machine wash cold', 'Reshape while damp and dry flat'],
    features: [
      'Deep honeycomb waffle structure for thermal air retention',
      'Extended 3" snug wrist cuffs for easy sleeve layering',
      'Garment washed for ultra soft immediate comfort'
    ],
    stock: 35,
    rating: 4.7,
    reviewsCount: 192,
    sku: 'AETH-TS-010',
    fit: 'Regular Fit',
    modelInfo: 'Model is 6\'0" wearing size M',
    reviews: [
      {
        id: 'rev-1001',
        userName: 'Tanmay Joshi',
        rating: 5,
        date: '1 week ago',
        title: 'Rich texture, great as standalone or base layer',
        comment: 'The waffle texture has so much depth. Pairs effortlessly with raw denim or pleated trousers.',
        verifiedPurchase: true,
        helpfulCount: 14,
        sizePurchased: 'M',
        colorPurchased: 'Chalk Cream'
      }
    ]
  },
  {
    id: 'prod-011',
    slug: 'relaxed-double-breasted-tailored-blazer',
    name: 'Unstructured Relaxed Double-Breasted Wool Blazer',
    brand: 'AETHER TAILORING',
    tagline: 'Modern Italian tailoring with soft shoulders and peak lapels',
    description: 'Designed without stiff shoulder pads or excessive canvas for an effortless, modern drape that pairs as comfortably with hoodies and t-shirts as with dress shirts.',
    longDescription: 'Features peak lapels, twin patch pockets, natural horn buttons, and unlined interior with bound seams that showcases immaculate craftsmanship.',
    price: 4999,
    originalPrice: 7999,
    discountPercentage: 37,
    category: 'Unisex',
    subcategory: 'Blazers',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dark Navy Twill', hex: '#0F172A', imageIndex: 0 },
      { name: 'Taupe Khaki', hex: '#8B7765', imageIndex: 1 },
      { name: 'Pitch Black', hex: '#000000', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['70% Fine Merino Wool', '28% Viscose', '2% Spandex'],
    fabricCare: ['Dry clean only', 'Steam to refresh between wears'],
    features: [
      'Unconstructed soft shoulder profile',
      'Double-breasted 4x2 button stance',
      'Dual rear vents for effortless movement',
      'Clean interior welt pocket with pen holder'
    ],
    stock: 14,
    rating: 4.8,
    reviewsCount: 153,
    sku: 'AETH-BL-011',
    isNewArrival: true,
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 6\'2" wearing size L',
    reviews: [
      {
        id: 'rev-1101',
        userName: 'Shashank R.',
        rating: 5,
        date: '3 days ago',
        title: 'The ultimate smart-casual blazer',
        comment: 'Soft shoulders make all the difference. You can wear this with white sneakers and a tee and look sharp without looking like a banker.',
        verifiedPurchase: true,
        helpfulCount: 27,
        sizePurchased: 'L',
        colorPurchased: 'Dark Navy Twill'
      }
    ]
  },
  {
    id: 'prod-012',
    slug: 'heavy-ribbed-cotton-drawstring-sweatpants',
    name: '450 GSM Heavy French Terry Relaxed Sweatpants',
    brand: 'AETHER STUDIO',
    tagline: 'Ultra-dense loungewear with metal tipped braided cords',
    description: 'Engineered from 450 GSM loopback cotton for a structured drape that never loses shape or sags around the knees.',
    longDescription: 'Features deep zippered pockets, back patch pocket with woven label, thick elastic waistband with heavyweight cotton drawstring, and elasticated cuffs.',
    price: 2499,
    originalPrice: 3799,
    discountPercentage: 34,
    category: 'Unisex',
    subcategory: 'Trousers & Pants',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Heather Ash Grey', hex: '#9CA3AF', imageIndex: 0 },
      { name: 'Onyx Black', hex: '#18181B', imageIndex: 1 },
      { name: 'Taupe Stone', hex: '#A89F91', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['100% Organic Cotton', '450 GSM Heavy Loopback'],
    fabricCare: ['Machine wash cold gentle', 'Hang dry in shade'],
    features: [
      '450 GSM structured loopback fabric',
      'Deep secure zipped side pockets',
      'Heavy-duty custom metal aglets on drawstrings',
      'No knee bagging even with daily wear'
    ],
    stock: 28,
    rating: 4.8,
    reviewsCount: 210,
    sku: 'AETH-SWP-012',
    isBestSeller: true,
    fit: 'Relaxed Fit',
    modelInfo: 'Model is 5\'11" wearing size M',
    reviews: [
      {
        id: 'rev-1201',
        userName: 'Arjun Sen',
        rating: 5,
        date: '2 days ago',
        title: 'Heaviest and most comfortable sweats ever',
        comment: 'The zipper pockets are a life saver so phone does not fall out. Matches perfectly with the Aether hoodie.',
        verifiedPurchase: true,
        helpfulCount: 33,
        sizePurchased: 'M',
        colorPurchased: 'Heather Ash Grey'
      }
    ]
  },
  {
    id: 'prod-mob-01',
    slug: 'aether-apex-5g-titanium-smartphone',
    name: 'Aether Apex 5G Titanium Smartphone (256GB OLED)',
    brand: 'AETHER TECH',
    tagline: 'Aerospace titanium chassis, 120Hz LTPO OLED, Triple 50MP Sony Sensors',
    description: 'Forged from Grade 5 aerospace titanium, the Aether Apex 5G combines ultra-durable matte glass with an edge-to-edge 6.7" 120Hz LTPO OLED display. Powered by next-gen 4nm architecture with 5000mAh battery and 100W GaN fast charging.',
    longDescription: 'Engineered for uncompromising performance and timeless design. The Apex 5G features a bespoke vapor chamber cooling matrix, custom tuned stereo acoustic drivers, and IP68 water resistance.',
    price: 64999,
    originalPrice: 79999,
    discountPercentage: 18,
    category: 'Mobiles',
    subcategory: 'Smartphones & Flagships',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#8E8E93', imageIndex: 0 },
      { name: 'Space Black', hex: '#1C1C1E', imageIndex: 1 },
      { name: 'Desert Dune', hex: '#C5A880', imageIndex: 2 }
    ],
    sizes: ['M', 'L'],
    materials: ['Grade 5 Aerospace Titanium', 'Corning Gorilla Armor Glass', 'Sapphire Lens Covers'],
    fabricCare: ['Wipe with microfiber cloth', 'Use certified 100W PD charger'],
    features: ['6.7" 120Hz LTPO OLED', 'Triple 50MP Camera Array', '100W Fast Charging', 'MagSafe Compatible'],
    stock: 15,
    rating: 4.9,
    reviewsCount: 189,
    sku: 'AETH-MOB-001',
    isBestSeller: true,
    isFeatured: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-mob-1',
        userName: 'Kabir Varma',
        rating: 5,
        date: '3 days ago',
        title: 'Masterpiece of industrial design',
        comment: 'The natural titanium finish feels incredible in the hand. Battery easily lasts 1.5 days on heavy 5G usage.',
        verifiedPurchase: true,
        helpfulCount: 42
      }
    ]
  },
  {
    id: 'prod-elec-01',
    slug: 'acoustic-studio-pro-wireless-headphones',
    name: 'Acoustic Studio Pro Wireless Active Noise-Cancelling Headphones',
    brand: 'AETHER AUDIO',
    tagline: 'Hybrid ANC, 40mm custom titanium drivers, 60-hour battery life',
    description: 'Immerse yourself in acoustic purity. Featuring custom 40mm titanium diaphragm drivers, active ambient suppression, memory foam lambskin earcups, and lossless Bluetooth 5.4 LDAC codec support.',
    longDescription: 'Crafted with machined aluminum yokes and breathable magnetic leather earcups, the Studio Pro delivers balanced audiophile response across 10Hz - 45kHz frequency range.',
    price: 18499,
    originalPrice: 24999,
    discountPercentage: 26,
    category: 'Electronics',
    subcategory: 'Wireless Audio',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181B', imageIndex: 0 },
      { name: 'Silver Frost', hex: '#E4E4E7', imageIndex: 1 }
    ],
    sizes: ['M'],
    materials: ['CNC Machined Aluminum', 'Lambskin Leather', 'Memory Foam'],
    fabricCare: ['Store in included hard shell travel case', 'Keep away from moisture'],
    features: ['Hybrid Active Noise Cancelling', '60-Hour Playback', 'Lossless LDAC Audio', 'Multi-point Bluetooth 5.4'],
    stock: 22,
    rating: 4.9,
    reviewsCount: 310,
    sku: 'AETH-AUD-001',
    isBestSeller: true,
    isFeatured: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-elec-1',
        userName: 'Rhea Sen',
        rating: 5,
        date: '1 week ago',
        title: 'ANC is better than Sony & Apple',
        comment: 'The comfort is unbeatable for 8+ hour work sessions. Build quality is top tier luxury.',
        verifiedPurchase: true,
        helpfulCount: 55
      }
    ]
  },
  {
    id: 'prod-beau-01',
    slug: 'oud-and-bergamot-reserve-parfum',
    name: 'Oud & Bergamot Reserve Private Blend Eau De Parfum (100ml)',
    brand: 'AETHER PARFUMS',
    tagline: 'Smoked Agarwood, Calabrian Bergamot, Amber & Warm Cedar',
    description: 'A hypnotic fragrance combining crisp sun-drenched Calabrian bergamot with intense smoky oud, cedarwood, and velvety amber. Formulated with 25% concentrated perfume oils for 14+ hour longevity.',
    longDescription: 'Hand-blended in Grasse, France. Housed in a heavyweight smoked glass flacon with a magnetic walnut cap.',
    price: 4899,
    originalPrice: 6500,
    discountPercentage: 25,
    category: 'Beauty',
    subcategory: 'Perfumes & Fragrances',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Smoked Amber Flacon', hex: '#92400E', imageIndex: 0 }
    ],
    sizes: ['M'],
    materials: ['25% Extrait Oil', 'Organic Grain Alcohol', 'Smoked Glass Flacon'],
    fabricCare: ['Keep out of direct sunlight', 'Store in a cool dry place'],
    features: ['14+ Hour Sillage', 'Handcrafted in Grasse, France', 'Magnetic Walnut Wooden Cap', 'Cruelty Free'],
    stock: 35,
    rating: 4.8,
    reviewsCount: 142,
    sku: 'AETH-BTY-001',
    isBestSeller: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-beau-1',
        userName: 'Devika Singhania',
        rating: 5,
        date: '4 days ago',
        title: 'Smells like pure luxury',
        comment: 'Gets compliments everywhere. The smoky oud and fresh bergamot balance is perfection.',
        verifiedPurchase: true,
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'prod-home-01',
    slug: 'minimalist-wabi-sabi-ceramic-table-lamp',
    name: 'Minimalist Wabi-Sabi Ceramic Architectural Table Lamp',
    brand: 'AETHER LIVING',
    tagline: 'Handcrafted stoneware body, natural linen lampshade, 3-step warm dimming',
    description: 'Elevate your living space with organic sculptural texture. Made from textured earthy ceramic stoneware paired with a textured drum linen shade, casting a warm diffused ambient glow.',
    longDescription: 'Includes smart LED filament bulb with stepless touch dimming integrated seamlessly into the base.',
    price: 5299,
    originalPrice: 7999,
    discountPercentage: 33,
    category: 'Home',
    subcategory: 'Decor & Lighting',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raw Sandstone', hex: '#D6D3D1', imageIndex: 0 },
      { name: 'Charcoal Basalt', hex: '#27272A', imageIndex: 1 }
    ],
    sizes: ['L'],
    materials: ['Natural Stoneware Ceramic', 'Belgian Natural Linen', 'Brass Fittings'],
    fabricCare: ['Dust with soft dry cloth', 'Do not use abrasive chemicals'],
    features: ['Hand-thrown ceramic body', '3-Step Touch Dimming', 'Energy Saving LED Included', 'Braided Fabric Cable'],
    stock: 18,
    rating: 4.9,
    reviewsCount: 88,
    sku: 'AETH-HOM-001',
    isFeatured: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-hom-1',
        userName: 'Sameer Rao',
        rating: 5,
        date: '5 days ago',
        title: 'Architectural beauty in my study',
        comment: 'Looks like a museum piece on my desk. The warm light creates the coziest evening vibe.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-app-01',
    slug: 'precision-barista-touch-espresso-machine',
    name: 'Precision Barista Touch Dual-Boiler Espresso Machine',
    brand: 'AETHER APPLIANCES',
    tagline: '15-Bar Italian Pump, PID temperature control, Automatic microfoam milk texturing',
    description: 'Master third-wave specialty coffee at home. Equipped with dual stainless steel thermo-blocks, integrated conical burr grinder with 30 grind settings, and a high-resolution color touchscreen.',
    longDescription: 'Automated touch operation lets you select Flat White, Espresso, Cappuccino, or customize temperature and extraction time with single-degree precision.',
    price: 28999,
    originalPrice: 38999,
    discountPercentage: 25,
    category: 'Appliances',
    subcategory: 'Smart Appliances',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Brushed Stainless Steel', hex: '#CBD5E1', imageIndex: 0 },
      { name: 'Matte Cast Iron Black', hex: '#0F172A', imageIndex: 1 }
    ],
    sizes: ['L'],
    materials: ['304 Food-Grade Stainless Steel', 'Italian Ulka 15-Bar Pump', 'Teflon-Free Lines'],
    fabricCare: ['Auto-purge steam wand after each use', 'Descale every 3 months'],
    features: ['Dual Stainless Boilers', '30-Setting Integrated Burr Grinder', 'Touchscreen UI', 'PID Precision Heating'],
    stock: 12,
    rating: 4.9,
    reviewsCount: 96,
    sku: 'AETH-APP-001',
    isBestSeller: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-app-1',
        userName: 'Tanvi Mehra',
        rating: 5,
        date: '2 weeks ago',
        title: 'Café grade espresso at home',
        comment: 'Extraction pressure is consistent and the auto milk frother creates velvety latte art microfoam.',
        verifiedPurchase: true,
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'prod-toy-01',
    slug: 'architectural-geometric-wooden-building-set',
    name: 'Architectural Geometric Solid Beechwood Building Set',
    brand: 'AETHER KIDS',
    tagline: '120-piece Montessori architectural set, FSC-certified solid beechwood, non-toxic organic oil',
    description: 'Inspire spatial imagination and architectural curiosity. Hand-sanded geometric arches, columns, domes, and bridges crafted from sustainably harvested European beechwood.',
    longDescription: 'Finished with organic beeswax and mineral oils with zero harmful paints or varnishes. Packed in a solid wooden heirloom storage chest.',
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 37,
    category: 'Toys & Baby',
    subcategory: 'Montessori & STEM Toys',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Natural Beechwood', hex: '#D2B48C', imageIndex: 0 }
    ],
    sizes: ['M'],
    materials: ['100% FSC-Certified European Beechwood', 'Organic Beeswax Finish'],
    fabricCare: ['Wipe clean with a damp cloth', 'Air dry thoroughly'],
    features: ['120 Precision Cut Pieces', 'Non-Toxic Child Safe Oil', 'Heirloom Wooden Crate', 'Montessori Certified'],
    stock: 30,
    rating: 4.8,
    reviewsCount: 74,
    sku: 'AETH-TOY-001',
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-toy-1',
        userName: 'Ananya Deshmukh',
        rating: 5,
        date: '1 week ago',
        title: 'Exceptional craftsmanship and safety',
        comment: 'The wood is silky smooth without any sharp edges. My kids build towering castles every single day.',
        verifiedPurchase: true,
        helpfulCount: 21
      }
    ]
  },
  {
    id: 'prod-spt-01',
    slug: 'aerodynamic-pro-carbon-tennis-racket',
    name: 'Aerodynamic Pro Carbon Fiber Tour Tennis Racket',
    brand: 'AETHER SPORTS',
    tagline: 'Toray T800 Japanese carbon fiber, 305g unstrung, aerodynamic beam profile',
    description: 'Engineered for elite control and explosive topspin. Featuring high-modulus Japanese Toray carbon composite construction with internal vibration dampening core for arm comfort.',
    longDescription: 'Optimized 98 sq. inch head size with a 16x19 string pattern for crisp ball feel and pinpoint baseline targeting.',
    price: 8999,
    originalPrice: 12999,
    discountPercentage: 30,
    category: 'Sports',
    subcategory: 'Athletic & Training',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1617083934555-563d3c8c7d5c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Carbon Matte Stealth', hex: '#27272A', imageIndex: 0 }
    ],
    sizes: ['M', 'L'],
    materials: ['Toray T800 Japanese Carbon Fiber', 'Gel Vibration Dampening Core'],
    fabricCare: ['Store in included thermal protective sleeve', 'Restring every 40 hours of play'],
    features: ['Toray High Modulus Carbon', '98 sq. in Precision Head', 'Anti-Torque Tapered Beam', 'Pre-Strung with Pro Poly'],
    stock: 16,
    rating: 4.9,
    reviewsCount: 65,
    sku: 'AETH-SPT-001',
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-spt-1',
        userName: 'Rohan Bose',
        rating: 5,
        date: '3 weeks ago',
        title: 'Effortless power and spin',
        comment: 'Arm friendly with zero elbow shock. The matte carbon finish looks stunning on court.',
        verifiedPurchase: true,
        helpfulCount: 17
      }
    ]
  },
  {
    id: 'prod-fur-01',
    slug: 'curved-boucle-minimalist-lounge-armchair',
    name: 'Curved Bouclé Minimalist Accent Lounge Armchair',
    brand: 'AETHER STUDIO',
    tagline: 'Heavyweight textured cream bouclé, solid kiln-dried ashwood internal frame',
    description: 'A sculptural statement piece. Features inviting cocooning curves upholstered in tactile high-wear bouclé fabric with high-resilience memory foam cushioning.',
    longDescription: 'Hand-crafted by master upholsterers with concealed solid oak support legs and 360-degree tailored visual lines.',
    price: 21999,
    originalPrice: 32999,
    discountPercentage: 33,
    category: 'Furniture',
    subcategory: 'Lounge & Accent Chairs',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Bouclé', hex: '#F5F5F4', imageIndex: 0 },
      { name: 'Charcoal Chenille', hex: '#3F3F46', imageIndex: 1 }
    ],
    sizes: ['L'],
    materials: ['Heavyweight Textured Bouclé', 'Kiln-Dried Ashwood', 'High-Density Memory Foam'],
    fabricCare: ['Spot clean with mild upholstery cleaner', 'Vacuum lightly with soft brush attachment'],
    features: ['Ergonomic Cocoon Silhouette', 'High Abrasion Resistant Fabric', 'Solid Timber Sub-Structure', 'White Glove Delivery'],
    stock: 8,
    rating: 5.0,
    reviewsCount: 42,
    sku: 'AETH-FUR-001',
    isFeatured: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-fur-1',
        userName: 'Meera Chawla',
        rating: 5,
        date: '6 days ago',
        title: 'The centerpiece of my living room',
        comment: 'Incredibly comfortable and the bouclé fabric is so soft. Looks like a European designer showroom piece.',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-bok-01',
    slug: 'architectural-minimal-pure-geometry-in-form',
    name: 'Architectural Minimal: Pure Geometry in Form (Hardcover Deluxe)',
    brand: 'AETHER PUBLISHING',
    tagline: '380-page visual monograph on global minimalist architecture, gold foil clothbound',
    description: 'A breathtaking volume documenting 50 monumental residential and institutional projects across Japan, Scandinavia, Switzerland, and India with full-bleed photography and architectural blueprints.',
    longDescription: 'Printed on 170 GSM FSC-certified matte art paper with Swiss lay-flat binding and debossed gold foil typography on dark linen cloth.',
    price: 2899,
    originalPrice: 4200,
    discountPercentage: 31,
    category: 'Books',
    subcategory: 'Design & Art Hardcovers',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Linen Hardcover', hex: '#27272A', imageIndex: 0 }
    ],
    sizes: ['M'],
    materials: ['170 GSM Heavyweight Matte Art Paper', 'Woven Natural Linen Clothbound', 'Gold Foil Stamping'],
    fabricCare: ['Keep dry and avoid prolonged direct sun exposure'],
    features: ['380 Full-Bleed Color Plates', 'Lay-Flat Swiss Binding', 'Detailed Architectural Section Plans', 'Deluxe Collector Slipcase'],
    stock: 45,
    rating: 5.0,
    reviewsCount: 112,
    sku: 'AETH-BOK-001',
    isBestSeller: true,
    fit: 'Regular Fit',
    reviews: [
      {
        id: 'rev-bok-1',
        userName: 'Siddharth Iyer',
        rating: 5,
        date: '1 week ago',
        title: 'Essential coffee table volume for architects',
        comment: 'The print quality, paper texture, and layout are world class. Inspiring read and visual feast.',
        verifiedPurchase: true,
        helpfulCount: 40
      }
    ]
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'AETHER20',
    discountType: 'percentage',
    value: 20,
    minSpend: 2000,
    description: '20% OFF on all luxury orders above ₹2,000'
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minSpend: 999,
    description: '10% OFF for new registered customers'
  },
  {
    code: 'FESTIVE500',
    discountType: 'fixed',
    value: 500,
    minSpend: 3000,
    description: 'Flat ₹500 instant discount on orders above ₹3,000'
  }
];
