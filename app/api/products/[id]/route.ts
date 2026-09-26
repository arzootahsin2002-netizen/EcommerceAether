import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}
