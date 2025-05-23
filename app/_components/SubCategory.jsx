"use client"
import Image from "next/image"
import protein from "../../public/protein.webp"
import vitamins from "../../public/vitamins.webp"
import fiber from "../../public/fibers.webp"
import minerals from "../../public/minerals.webp"
import antioxidants from "../../public/anti .webp"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const SubCategory = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const categories = [
    { name: "Protein", image: protein, color: "from-emerald-500 to-green-600" },
    { name: "Vitamins", image: vitamins, color: "from-yellow-500 to-amber-600" },
    { name: "Minerals", image: minerals, color: "from-blue-500 to-cyan-600" },
    { name: "Fiber", image: fiber, color: "from-orange-500 to-amber-600" },
    { name: "Antioxidants", image: antioxidants, color: "from-purple-500 to-indigo-600" },
  ]

  return (
    <div className="mt-16 py-8">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-green-700 inline-block relative">
          Nutrient Categories
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-200 rounded-full"></span>
        </h2>
        <p className="text-green-600 mt-2">Explore essential nutrients for optimal health</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-wrap justify-center gap-6 mt-8"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={item} className="relative group">
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col bg-white rounded-xl w-[250px] h-[350px] overflow-hidden shadow-md"
            >
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={250}
                  height={200}
                  className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-20 transition-opacity`}
                ></div>
              </div>

              <div className="flex flex-col items-center justify-center flex-grow p-6 bg-gradient-to-b from-green-50 to-white">
                <h3 className="text-xl font-semibold text-green-800 mb-3">{category.name}</h3>
                <p className="text-sm text-green-700 text-center mb-4 opacity-80">
                  Essential {category.name.toLowerCase()} for your daily nutritional needs
                </p>
                <Button className={`bg-gradient-to-r ${category.color} hover:opacity-90 transition-all duration-300`}>
                  Explore
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default SubCategory
