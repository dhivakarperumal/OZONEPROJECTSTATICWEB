import React from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";

const categories = [
    {
        name: "Mosquito Nets",
        image: "/Images/cat1mosquitonets.avif",
        filter: "Mosquito Nets",
    },
    {
        name: "Mosquito Doors",
        image: "/Images/cat2mosquitodoors.webp",
        filter: "Mosquito Doors",
    },
    {
        name: "Window Blinds",
        image: "/Images/cat3windowblind.webp",
        filter: "Window Blinds",
    },
    {
        name: "UPVC Systems",
        image: "/Images/cat4upvc.jpg",
        filter: "UPVC Systems",
    },
];

const CategorySection = () => {

    return (
        <section className="py-16 bg-[radial-gradient(circle_at_top_left,_rgba(12,89,64,0.08),_transparent_35%),linear-gradient(to_bottom,#ffffff,#f7fcf9)]">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#eaf7ed] text-[#0c5940] font-semibold uppercase tracking-widest text-xs">
                        Explore
                    </span>

                    <h2 className="text-4xl font-black mt-6 leading-tight">
                        <span className="text-gray-900">Shop By</span>{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, #0c5940 0%, #0ea5e9 45%, #22c55e 100%)",
                            }}
                        >
                            Category
                        </span>
                    </h2>

                    <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
                        Discover our premium collection of architectural hardware and
                        mosquito protection solutions.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to="/products"
                            state={{ category: category.filter }}
                            className="group"
                        >
                            <div className="relative bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:border-[#0c5940]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden">

                                {/* Background Circle */}
                                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-[#0c5940]/15 to-[#081A59]/10 group-hover:scale-125 transition duration-700"></div>

                                {/* Image */}
                                <div className="relative z-10 flex justify-center">
                                    <div className="w-45 h-45 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 mt-8 text-center">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {category.name}
                                    </h3>

                                    {/* <p className="mt-3 text-sm text-slate-500">
                                        Premium fitment collection with elegant finishes.
                                    </p> */}

                                    <div className="mt-6 inline-flex items-center gap-2 text-[#0c5940] font-semibold group-hover:gap-4 transition-all">
                                        Explore
                                        <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategorySection;