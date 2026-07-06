import React from "react";
import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import PageContainer from "./PageContainer";

const TopHeader = () => {
    return (
        <div
            className="text-white text-sm rounded-b-[35px] overflow-hidden shadow-lg"
            style={{
                background: "linear-gradient(90deg, #234CC4 0%, #112B87 50%, #08164F 100%)",
            }}
        >
            <PageContainer>
                <div className="h-11 flex items-center justify-between">

                    {/* Left */}
                    <div className="items-center gap-6 shrink-0">
                        <a
                            href="tel:+918950678907"
                            className="flex items-center gap-2 hover:text-gray-200 transition"
                        >
                            <Phone size={15} />
                            <span>+91 89506 78907</span>
                        </a>

                        <a
                            href="mailto:support@ozone.com"
                            className="flex items-center gap-2 hover:text-gray-200 transition"
                        >
                            <Mail size={15} />
                            <span>support@ozone.com</span>
                        </a>
                    </div>

                    {/* Center */}
                    <div className="flex-1 mx-8 overflow-hidden">
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
                    </div>

                    {/* Right */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                        {[
                            {
                                icon: FaFacebookF,
                                href: "#",
                                hover: "hover:bg-blue-600",
                            },
                            {
                                icon: FaInstagram,
                                href: "#",
                                hover:
                                    "hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500",
                            },
                            {
                                icon: FaYoutube,
                                href: "#",
                                hover: "hover:bg-red-600",
                            },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 ${item.hover}`}
                            >
                                <item.icon size={14} />
                            </a>
                        ))}
                    </div>

                </div>
            </PageContainer>
        </div>
    );
};

export default TopHeader;