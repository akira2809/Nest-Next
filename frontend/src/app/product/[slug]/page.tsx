// "use client"
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface Product {
    slug: string;
    product_id: string;
    name: string;
    main_image: string;
    base_price: number;
    description: string;
    colors: string[];
    sizes: string[];
    sale_price?: number;
    product_variants: any[];
    stock: number
}

type Params = {
    slug: string;
};

async function getProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(`http://localhost:3001/products/slug/${slug}`);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }: { params: Params }) {
    const { slug } = await params
    const product = await getProduct(slug);
    console.log(product)
    if (!product) return notFound();

    return <ProductDetail product={product} />;
}
