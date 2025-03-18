/* eslint-disable @next/next/no-img-element */
'use client';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ContentBanner from "./ContentBanner";
export default function ImageSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div style={{ width: "calc(100% - 25px)" }}>
            <Slider  {...settings}>
                <img src="https://file.hstatic.net/1000402464/file/jh-banner-web.jpg" alt="Slide 2" />
                <img src="https://file.hstatic.net/1000402464/file/fl-banner-web.jpg" alt="Slide 3" />
            </Slider>
            {/* <ContentBanner></ContentBanner> */}
        </div>
    );
}