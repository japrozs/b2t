import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { HotelSearchItemType } from "@/types";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface CarouselProps {
    hotel: HotelSearchItemType;
}

export const Carousel: React.FC<CarouselProps> = ({ hotel }) => {
    const settings = {
        // dots: true,
        infinite: true,
        accessibility: true,
        arrows: false,
        speed: 200,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let sliderRef = useRef(null);

    return (
        <Slider
            {...settings}
            ref={(slider) => {
                sliderRef = slider as any;
            }}
            className="mx-auto rounded-lg p-0"
        >
            {hotel.details.Details[0].Images.Img.map((image, index) => (
                <div key={index} className="focus:ring-0 focus:outline-none">
                    <div className="flex items-center">
                        <div
                            onClick={() => (sliderRef as any).slickPrev()}
                            className="transition-all p-1 hover:bg-blue-50 rounded-lg mr-2 cursor-pointer "
                        >
                            <IoChevronBack className="text-xl text-blue-500" />
                        </div>
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full h-auto rounded-lg border border-gray-300"
                        />
                        {/* <p onClick={() => (sliderRef as any).slickNext()}>
                            next
                        </p> */}
                        <div
                            onClick={() => (sliderRef as any).slickNext()}
                            className="transition-all p-1 hover:bg-blue-50 rounded-lg ml-2 cursor-pointer "
                        >
                            <IoChevronForward className="text-xl text-blue-500" />
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};
