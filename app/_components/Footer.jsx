"use client"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-gradient-to-br from-green-800 to-green-900 text-white mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">NutriBot</h3>
            <p className="text-green-100 mb-4">
              Empowering healthier lives through personalized nutrition guidance and education.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/growth-chart" className="text-green-200 hover:text-white transition-colors">
                  Growth Charts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  Nutrition Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  Meal Planning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-green-300" />
                <span className="text-green-100">123 Nutrition Avenue</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-300" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-300" />
                <span className="text-green-100">info@nutriBot.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-10 pt-6 text-center text-green-200">
          <p>© {currentYear} NutriBot. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
