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
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="text-[#0c5940] font-semibold uppercase tracking-widest text-sm">
                        Explore
                    </span>

                    <h2 className="text-4xl font-bold text-gray-900 mt-2">
                        Shop By Category
                    </h2>

                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        Discover our premium collection of architectural hardware and
                        mosquito protection solutions.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="group relative rounded-2xl overflow-hidden shadow-lg"
                        >
                            <Link
                                key={category.name}
                                to="/products"
                                state={{ category: category.filter }}
                                className="group relative rounded-2xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-white text-2xl font-bold">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategorySection;