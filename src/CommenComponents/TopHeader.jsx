import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import PageContainer from "./PageContainer";

const TopHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="hidden lg:block text-white text-sm rounded-b-[35px] overflow-hidden shadow-lg"
            style={{
                background: "linear-gradient(90deg, #234CC4 0%, #112B87 50%, #08164F 100%)",
            }}
        >
            <PageContainer>
                <div className="h-11 flex items-center justify-between">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="hidden lg:flex items-center gap-6 shrink-0"
                    >
                        <motion.a
                            href="tel:+918950678907"
                            whileHover={{ x: 3, scale: 1.01 }}
                            className="flex items-center gap-2 hover:text-gray-200 transition"
                        >
                            <Phone size={15} />
                            <span>+91 89506 78907</span>
                        </motion.a>

                        <motion.a
                            href="mailto:ozoneenterprises0625@gmail.com"
                            whileHover={{ x: 3, scale: 1.01 }}
                            className="flex items-center gap-2 hover:text-gray-200 transition"
                        >
                            <Mail size={15} />
                            <span>Ozoneenterprises0625@gmail.com</span>
                        </motion.a>
                    </motion.div>

                    {/* Center */}
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 mx-8 overflow-hidden"
                    >
                        <marquee
                            scrollamount="5"
                            behavior="scroll"
                            direction="left"
                            className="font-medium tracking-wide"
                        >
                            Welcome to OZONE ENTERPRISES • Premium Mosquito Mesh Solutions •
                            Windows • Doors • Balcony Safety Nets • Invisible Grills • Free
                            Site Visit • Contact Us Today •
                        </marquee>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                        className="hidden lg:flex items-center gap-2 shrink-0"
                    >
                        {[
                            {
                                icon: FaFacebookF,
                                href: "#",
                                hover: "hover:bg-blue-600",
                            },
                            {
                                icon: FaInstagram,
                                href: "https://www.instagram.com/ozone_enterprises_?igsh=MTNydnc0MWd1YnJiZA==",
                                hover:
                                    "hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500",
                            },
                            {
                                icon: FaYoutube,
                                href: "#",
                                hover: "hover:bg-red-600",
                            },
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                whileHover={{ scale: 1.12, y: -2, rotate: 6 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 ${item.hover}`}
                            >
                                <item.icon size={14} />
                            </motion.a>
                        ))}
                    </motion.div>

                </div>
            </PageContainer>
        </motion.div>
    );
};

export default TopHeader;