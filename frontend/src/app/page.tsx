<<<<<<< HEAD
export default function HomePage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-blue-600">🔥 Chào mừng đến Next.js + Tailwind!</h1>
      <p className="text-gray-700 mt-4">Đây là trang chủ cơ bản sử dụng TailwindCSS.</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
        Bấm vào tui đi! 😆
      </button>
=======
import ImageSlider from "./components/Banner";
import MainContent from "./components/MainContent";
import Divider from '@mui/material/Divider';
export default function Home() {
  return (
    <div>
      <ImageSlider />
      <MainContent></MainContent>
      <Divider />
>>>>>>> main
    </div>
  );
}
