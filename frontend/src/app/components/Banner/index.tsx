/* eslint-disable @next/next/no-img-element */
"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";

export default function ImageSlider() {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true,
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Slider */}
            <Slider ref={sliderRef} {...settings}>
                {[
                    "https://file.hstatic.net/1000402464/file/jh-banner-web.jpg",
                    "https://file.hstatic.net/1000402464/file/fl-banner-web.jpg",
                ].map((src, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={src}
                        alt={`Slide ${index + 1}`}
                        sx={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                ))}
            </Slider>

            {/* Nút điều hướng */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 20,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 20,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
                onClick={() => sliderRef.current?.slickNext()}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
}
