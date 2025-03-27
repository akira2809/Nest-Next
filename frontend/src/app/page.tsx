import ImageSlider from "./components/Banner";
import MainContent from "./components/MainContent";
import FashionGrid from "./components/Banner/ContentHomeCollection/page";
import Newsletter from "./components/Banner/Newsletter/page";
export default function Home() {
  return (
    <div>
      <ImageSlider />
     <FashionGrid></FashionGrid>
      <MainContent></MainContent>
    <Newsletter></Newsletter>
    </div>
  );
}
