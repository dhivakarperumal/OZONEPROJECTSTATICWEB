import React from "react";

const Heading = ({ title, subtitle, className = "mb-6" }) => {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      {title && <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>}
    </div>
  );
};

export default Heading;
