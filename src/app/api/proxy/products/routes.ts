// app/api/proxy/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://adbf-2a09-bac5-d46c-2723-00-3e6-48.ngrok-free.app/api/product",
      {
        cache: "no-store", // optional: tránh cache
      },
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 },
    );
  }
}
