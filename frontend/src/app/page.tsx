import ImageSlider from "./components/Banner";
import MainContent from "./components/MainContent";
import Divider from '@mui/material/Divider';
export default function Home() {
  return (
    <div>
      <ImageSlider />
      <MainContent></MainContent>
      <Divider />
    </div>
  );
}
