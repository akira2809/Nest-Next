import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    colors: string[];
    sizes: string[];
}

type Params = {
    slug: string;
};

async function getProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(`http://localhost:3001/product/slug/${slug}`);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }: { params: Params }) {
    const product = await getProduct(params.slug);
    if (!product) return notFound();

    return <ProductDetail product={product} />;
}
