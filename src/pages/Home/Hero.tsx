import LazyImage from "@/components/LazyImage";
import { useFetchSliders } from "@/services/service-index";
import { Flex } from "@chakra-ui/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  const { data: sliders } = useFetchSliders();
  return (
    <Flex
      w={"100vw"}
      h={{ base: "300px", md: "400px", lg: "600px" }}
      justifyContent={"center"}
      alignItems={"center"}
      pos={"relative"}
    >
      <Swiper
        className="hero-slider"
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        modules={[Autoplay]}
      >
        {sliders?.data?.rows.map((slider, index) => (
          <SwiperSlide className="hero-slide" key={index}>
            <LazyImage
              h={{ base: "300px", md: "400px", lg: "600px" }}
              objectFit={"cover"}
              w={"full"}
              aspectRatio={16 / 9}
              objectPosition={"center"}
              src={slider.image}
              alt={slider.subtitle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default Hero;
