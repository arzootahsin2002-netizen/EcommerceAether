import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const sort = searchParams.get('sort');

  let results = [...INITIAL_PRODUCTS];

  if (q) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (subcategory) {
    results = results.filter((p) => p.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);

  return NextResponse.json({
    success: true,
    total: results.length,
    products: results
  });
}
