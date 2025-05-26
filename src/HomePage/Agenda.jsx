import React, { useState } from "react";

function Agenda({id}) {
  const [selectedDate, setSelectedDate] = useState("1 Feb");
  const EventDate = ["1 Feb", "2 Feb"];
  const agendaItems = [
    {
      Date: "1 Feb",
      time: "09:00 - 09:30 AM",
      Venue: "Floor 1, Melbourne Connect",
      session: "Registration and Welcome of Day 1",
      description: "Check-in and welcome remarks.",
      speaker: "Event Organizer",
    },
    {
      Date: "1 Feb",
      time: "09:30 - 10:30 AM",
      Venue: "Floor 1, Melbourne Connect",
      session: "Opening Keynote of Day 1",
      description: "Introduction to the event.",
      speaker: "Keynote Speaker",
    },
    {
      Date: "2 Feb",
      time: "09:00 - 09:30 AM",
      Venue: "Floor 2, Melbourne Connect",
      session: "Registration and Welcome of Day 2",
      description: "Check-in and welcome remarks.",
      speaker: "Event Organizer",
    },
    {
      Date: "2 Feb",
      time: "09:30 - 10:30 AM",
      Venue: "Floor 2, Melbourne Connect",
      session: "Opening Keynote of Day 2",
      description: "Introduction to the event.",
      speaker: "Keynote Speaker",
    },
  ];

  const filteredItems = agendaItems.filter(item => item.Date === selectedDate);

  return (
    <div className="container mx-auto px-4 py-8" id={id}>
      <p className="text-4xl font-bold mb-6 text-center">Agenda</p>

      <div className="flex gap-4 mb-8 justify-center flex-wrap sm:flex-nowrap sm:overflow-visible overflow-x-auto">
        {EventDate.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`rounded-full border-2 text-xl px-10 py-2 transition whitespace-nowrap ${
              selectedDate === date
                ? "bg-[#000F46] text-white border-[#000F46]"
                : "border-[#000F46] text-[#000F46]"
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      <div className="w-full sm:w-4/5 mx-auto">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row sm:justify-between sm:space-x-[20%] mb-4 p-4 sm:p-8 rounded ${
              index % 2 === 1 ? "bg-gray-100" : ""
            }`}
          >
            <div className="sm:mr-6 min-w-[140px] max-w-[624px] mb-2 sm:mb-0">
              <p className="text-lg font-bold">{item.time}</p>
              <p className="text-md">{item.Venue}</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold mb-1">{item.session}</p>
              <p className="text-md mb-1">{item.description}</p>
              <p className="text-md italic">Speaker: {item.speaker}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agenda;
