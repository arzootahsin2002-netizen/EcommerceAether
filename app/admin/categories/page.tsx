'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Percent,
  Layers,
  Sparkles
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useAdmin } from '@/lib/admin/adminStore';
import { AdminCategory } from '@/lib/admin/types';
import { BaseModal, ConfirmModal } from '@/components/admin/ui/Modals';

export default function AdminCategoriesPage() {
  const { categories, addCategory, deleteCategory, updateCategory } = useAdmin();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [deletingCat, setDeletingCat] = useState<AdminCategory | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
    description: '',
    commissionRate: 10,
    subcategories: ''
  });

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const newCat: AdminCategory = {
      id: `cat-${Date.now()}`,
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: form.image,
      description: form.description,
      productsCount: 0,
      status: 'Active',
      displayOrder: categories.length + 1,
      commissionRate: Number(form.commissionRate),
      subcategories: form.subcategories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    };

    addCategory(newCat);
    setIsAddOpen(false);
    setForm({
      name: '',
      slug: '',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
      description: '',
      commissionRate: 10,
      subcategories: ''
    });
  };

  return (
    <AdminLayout
      title="Category & Taxonomy Management"
      subtitle="Organize marketplace department hierarchies, tiered commission cuts, and subcategory trees."
      actions={
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Department</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 shadow-2xs">
                    <Image src={cat.image} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-950">{cat.name}</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">/{cat.slug}</span>
                  </div>
                </div>

                <StatusBadge status={cat.status} size="sm" />
              </div>

              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-100 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-bold uppercase">Commission</span>
                  <span className="font-black text-amber-600">{cat.commissionRate}% cut</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block font-bold uppercase">Catalog Size</span>
                  <span className="font-bold text-zinc-900">{cat.productsCount} items</span>
                </div>
              </div>

              {/* Subcategories Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Subcategories ({cat.subcategories.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-zinc-100 text-zinc-700 rounded-md text-[11px] font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-400">Display Order: #{cat.displayOrder}</span>
              <button
                onClick={() => setDeletingCat(cat)}
                className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <BaseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Department">
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Department Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Luxury Watches"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Commission Cut (%) *</label>
              <input
                type="number"
                required
                value={form.commissionRate}
                onChange={(e) => setForm({ ...form, commissionRate: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Summary of products in this category..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Subcategories (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Automatic, Chronograph, Diver, Smart"
              value={form.subcategories}
              onChange={(e) => setForm({ ...form, subcategories: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Create Category
            </button>
          </div>
        </form>
      </BaseModal>

      {deletingCat && (
        <ConfirmModal
          isOpen={!!deletingCat}
          onClose={() => setDeletingCat(null)}
          onConfirm={() => {
            deleteCategory(deletingCat.id);
            setDeletingCat(null);
          }}
          title="Delete Category"
          message={`Are you sure you want to delete the "${deletingCat.name}" category?`}
          confirmLabel="Delete Category"
          isDanger={true}
        />
      )}
    </AdminLayout>
  );
}
