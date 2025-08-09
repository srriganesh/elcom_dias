// src/pages/Events.jsx
import React from "react";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Inaugural Event",
    date: "11/08/2025",
    time: "03:00 PM",
    venue: "Auditorium",
    poster: "public/images/E1.jpg",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 2,
    title: "AI( Artificial Intelligence)",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 3,
    title: "Robotics",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 4,
    title: "Computer Network ",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 5,
    title: "VLSI",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 6,
    title: " Industrial projects",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  {
    id: 7,
    title: "Mock placement drive",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
    {
    id: 8,
    title: " EMBEDDED Systems",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    poster: "public/images/tba.webp",
    link: "https://forms.gle/your-form-link",
  },
  
];

export default function Events() {
  return (
    <div id="events" className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#003092]">
        Upcoming Events
      </h1>
      <h1></h1>
      <div
        className={`flex justify-center`}
      >
        <div
          className={`grid gap-6 w-full max-w-6xl ${
            events.length < 3
              ? "grid-cols-1 sm:grid-cols-2 place-items-center"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden w-80"
            >
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#003092]">
                    {event.title}
                  </h2>
                  <div className="mt-3 space-y-1 text-gray-600 text-sm">
                    <p className="flex items-center gap-2">
                      <Calendar size={16} /> {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} /> {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} /> {event.venue}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full bg-[#003092] hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Register Now <ExternalLink className="inline-block ml-1" size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
