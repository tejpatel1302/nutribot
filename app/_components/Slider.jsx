"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import image from "../../public/banner.webp"
import image2 from "../../public/banner2webp.webp"
import { motion } from "framer-motion"

const Slider = () => {
  return (
    <div className="relative">
      <motion.div
        whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden rounded-2xl shadow-xl"
      >
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative">
                <Image
                  src={image || "/placeholder.svg"}
                  width={1000}
                  height={300}
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                  alt="Healthy nutrition banner"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md mb-2">Nourish Your Body</h2>
                    <p className="text-white text-lg md:text-xl max-w-md drop-shadow-md">
                      Discover the perfect balance of nutrients for your health journey
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative">
                <Image
                  src={image2 || "/placeholder.svg"}
                  width={1000}
                  height={300}
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                  alt="Healthy nutrition banner"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent flex items-center">
                  <div className="p-8 md:p-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md mb-2">
                      Personalized Nutrition
                    </h2>
                    <p className="text-white text-lg md:text-xl max-w-md drop-shadow-md">
                      Tailored diet plans to meet your unique health goals
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
        </Carousel>
      </motion.div>
    </div>
  )
}

export default Slider
