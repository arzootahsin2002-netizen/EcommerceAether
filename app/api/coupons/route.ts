import { NextResponse } from 'next/server';
import { VALID_COUPONS } from '@/lib/products-data';

export async function POST(request: Request) {
  try {
    const { code, cartSubtotal } = await request.json();
    const cleanCode = (code || '').trim().toUpperCase();

    const coupon = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired coupon code.' },
        { status: 400 }
      );
    }

    if (cartSubtotal < coupon.minSpend) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum bag spend of ₹${coupon.minSpend} required for this coupon.`
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Coupon applied successfully!',
      coupon
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Failed to process coupon validation.' },
      { status: 500 }
    );
  }
}
