import React from "react";
import { 
  AppWindow, 
  DoorClosed, 
  ScrollText, 
  AlignJustify, 
  ArrowLeftRight, 
  Link2, 
  Magnet, 
  GripVertical
} from "lucide-react";

// Kept exactly 8 items as requested
const fitments = [
  { id: 1, name: "Window Fitments", icon: AppWindow },
  { id: 2, name: "Door Fitments", icon: DoorClosed },
  { id: 3, name: "Roll Fitments", icon: ScrollText },
  { id: 4, name: "Pleated Fitments", icon: AlignJustify },
  { id: 5, name: "Glide Fitments", icon: ArrowLeftRight },
  { id: 6, name: "Zip Fitments", icon: Link2 },
  { id: 7, name: "Magnet Fitments", icon: Magnet },
  { id: 8, name: "Velcro Fitments", icon: GripVertical },
];

const CompanyLogos = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-[#13328D] font-extrabold text-sm sm:text-base tracking-wide uppercase">
          Fitment Systems
        </h2>
      </div>

      {/* Static Grid Container (No animation) */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
          {fitments.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center gap-3 text-gray-500 hover:text-[#13328D] transition-colors duration-300 cursor-pointer w-full"
              >
                <div className="h-16 w-16 flex items-center justify-center">
                  <Icon size={36} strokeWidth={1.2} />
                </div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight">
                  {item.name.replace(' ', '\n')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
