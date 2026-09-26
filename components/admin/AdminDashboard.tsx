'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Search,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { Product, ProductCategory, ClothingType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function AdminDashboard() {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'AETHER STUDIO',
    tagline: 'Crafted with premium high-density fabric',
    description: 'Engineered for contemporary luxury and everyday versatility.',
    price: 2999,
    originalPrice: 4499,
    category: 'Men' as ProductCategory,
    subcategory: 'T-Shirts' as ClothingType,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    stock: 25,
    sizes: 'S, M, L, XL',
    colors: 'Onyx Black:#18181B, Warm Taupe:#8B7765'
  });

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.total, 0) + 184500;
  const totalOrdersCount = orders.length + 42;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const parsedSizes = newProduct.sizes.split(',').map((s) => s.trim() as any);
    const parsedColors = newProduct.colors.split(',').map((c) => {
      const [name, hex] = c.split(':');
      return {
        name: name?.trim() || 'Standard',
        hex: hex?.trim() || '#000000',
        imageIndex: 0
      };
    });

    const created: Product = {
      id: `prod-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      name: newProduct.name,
      brand: newProduct.brand,
      tagline: newProduct.tagline,
      description: newProduct.description,
      longDescription: newProduct.description,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      discountPercentage: Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100),
      category: newProduct.category,
      subcategory: newProduct.subcategory,
      gender: 'Unisex',
      images: [newProduct.imageUrl],
      colors: parsedColors,
      sizes: parsedSizes,
      materials: ['100% Combed Cotton', 'Pre-shrunk'],
      fabricCare: ['Machine wash cold', 'Dry flat'],
      features: ['Artisanal construction', 'Reinforced seams'],
      stock: Number(newProduct.stock),
      rating: 5.0,
      reviewsCount: 1,
      reviews: [],
      sku: `AETH-${Math.floor(100 + Math.random() * 900)}`,
      fit: 'Relaxed Fit'
    };

    addProduct(created);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      brand: 'AETHER STUDIO',
      tagline: 'Crafted with premium high-density fabric',
      description: 'Engineered for contemporary luxury and everyday versatility.',
      price: 2999,
      originalPrice: 4499,
      category: 'Men',
      subcategory: 'T-Shirts',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      stock: 25,
      sizes: 'S, M, L, XL',
      colors: 'Onyx Black:#18181B, Warm Taupe:#8B7765'
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
            ADMIN CONTROL SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950 mt-1">
            Store Operations & Inventory
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Garment
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-950">{formatPrice(totalRevenue)}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 18.4% from last week</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase">Orders Count</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-950">{totalOrdersCount}</div>
          <p className="text-[11px] text-zinc-500 mt-1">Avg Ticket: {formatPrice(avgOrderValue)}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase">Active Catalog</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-950">{products.length} SKUs</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% In Stock</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase">Satisfaction Score</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-950">4.9 / 5.0</div>
          <p className="text-[11px] text-zinc-500 mt-1">Based on 2,800+ reviews</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-6 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Incoming Orders & Fulfillment ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT CATALOG */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Search products by title, SKU, or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs outline-none focus:border-zinc-950"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <span className="text-xs text-zinc-500">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-zinc-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-semibold border-b border-zinc-200">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                          <Image src={p.images[0]} alt="" fill unoptimized className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-950">{p.name}</div>
                          <div className="text-[11px] text-zinc-400">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-zinc-500">{p.sku}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-zinc-100 rounded-md text-[11px] font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-zinc-950">{formatPrice(p.price)}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          p.stock > 10
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="flex items-center gap-1 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {p.rating}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INCOMING ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-white rounded-2xl border border-zinc-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-semibold border-b border-zinc-200">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer & City</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Current Status</th>
                  <th className="p-3.5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-zinc-400">
                      No live customer orders right now. Place a test order in the checkout flow!
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-zinc-950">{o.orderNumber}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-zinc-900">{o.shippingAddress.fullName}</div>
                        <div className="text-[11px] text-zinc-400">{o.shippingAddress.city}</div>
                      </td>
                      <td className="p-3.5">{o.items.length} items</td>
                      <td className="p-3.5 font-black text-zinc-950">{formatPrice(o.pricing.total)}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 bg-zinc-100 rounded text-[11px]">
                          {o.paymentMethod.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 text-xs font-semibold bg-white"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 border border-zinc-200 animate-scale">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <h3 className="text-lg font-bold text-zinc-950">Add New Garment to Catalog</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 GSM Heavyweight French Terry Hoodie"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Outerwear">Outerwear</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Subcategory</label>
                    <select
                      value={newProduct.subcategory}
                      onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl"
                    >
                      <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Trousers & Pants">Trousers & Pants</option>
                      <option value="Jackets & Coats">Jackets & Coats</option>
                      <option value="Knitwear & Sweaters">Knitwear & Sweaters</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">High-Res Image URL</label>
                  <input
                    type="url"
                    required
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Available Sizes (comma separated)</label>
                    <input
                      type="text"
                      value={newProduct.sizes}
                      onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Stock Units</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-2xl transition-colors cursor-pointer"
                >
                  Publish Garment
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
