import React from "react";

function Card({ title, backgroundImage, oneLiner }) {
  return (
    <div
      className="relative w-full h-48 md:h-64 bg-cover bg-center rounded-lg overflow-hidden flex flex-col items-center justify-center text-white transform transition-transform duration-300 hover:scale-105 group"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <h2 className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl font-bold transition-transform duration-300 group-hover:top-4 group-hover:-translate-y-0 z-10 text-center">
        {title}
      </h2>
      <p className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
        {oneLiner}
      </p>
    </div>
  );
}

export default Card;
