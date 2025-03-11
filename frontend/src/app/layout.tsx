import Link from "next/link";
import "./globals.css"; // Import Tailwind

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 p-4 text-white">
          <nav className="flex justify-center space-x-4">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <Link href="/about" className="hover:underline">Giới thiệu</Link>
            <Link href="/contact" className="hover:underline">Liên hệ</Link>
          </nav>
        </header>

        <main className="container mx-auto p-4">{children}</main>

        <footer className="text-center p-4 bg-gray-800 text-white mt-4">
          <p>© 2025. Bản quyền thuộc về tôi 😎</p>
        </footer>
      </body>
    </html>
  );
}
