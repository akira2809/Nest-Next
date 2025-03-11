export async function getProducts() {
    const res = await fetch('http://localhost:3001/product');
    if (!res.ok) throw new Error('Lỗi khi lấy sản phẩm');
    return res.json();
  }
  