import React from "react";

const leaders = [
  {
    id: 1,
    name: "Dr Santhi B",
    role: "Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/public/images/leader1.jpg",
  },
  {
    id: 2,
    name: "Dr Narasimhan D",
    role: "Associate Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/public/images/leader2.jpg",
  },
  {
    id: 3,
    name: "Dr Alli Rani A",
    role: "Associate Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/public/images/leader3.jpg",
  },
  {
    id: 4,
    name: "Dr Revathy K",
    role: "Elcom Dais Coordinator",
    subRole: "SRC, SASTRA",
    imageUrl: "/public/images/leader4.jpg",
  },
  {
    id: 5,
    name: "Dr Gayathri Devi T",
    role: "Elcom Dais Coordinator",
    subRole: "SRC, SASTRA",
    imageUrl: "/public/images/leader5.jpg",
  },
  {
    id: 6,
    name: "Krishna Sai Sanjeevi Singh",
    role: "President",
    subRole: "Elcom Dais",
    imageUrl: "/public/images/leader6.png",
  },
];

function LeaderCard({ leader }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 w-72 flex flex-col items-center text-center">
      <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-200 shadow-md mb-4">
        <img
          src={leader.imageUrl}
          alt={leader.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">{leader.name}</h3>
      <p className="text-blue-600 font-medium">{leader.role}</p>
      <p className="text-gray-500 text-sm">{leader.subRole}</p>
    </div>
  );
}

export default function Leaders() {
  return (
    <section id="leaders" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#003092] mb-3">
          Our Leaders</h1>        
          <p className="text-center text-gray-600 mb-5">
          Meet the brilliant minds behind ELCOM DAIS
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
