"use client"
import { Calendar, CalendarDate, DateValue } from "@nextui-org/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Home() {
  const [startDate, setStartDate] = useState<DateValue>();
  const [endDate, setEndDate] = useState<DateValue>();

  const handleEndeDateChange = (date: DateValue) => {
    setEndDate(date);
  };

  const handleStartDateChange = (date: DateValue) => {
    setStartDate(date);
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-white">
      <section className="mt-6 h-16 shadow rounded-full flex w-3/6 items-center justify-between relative border-2">
          <input placeholder="Número da Sprint" className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <input placeholder="Início" value={startDate && format(new Date(startDate), "dd 'de' MMM", { locale: ptBR })} className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <input placeholder="Termino" value={endDate && format(new Date(endDate), "dd 'de' MMM", { locale: ptBR })} className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <button className="rounded-full absolute bg-gray-800 w-28 h-3/4 right-0 mr-2 text-white font-bold hover:bg-green-800 transaction duration-500">Sprint</button>
      </section>
      <div className="flex gap-x-4">
        <Calendar aria-label="Date (No Selection)" onChange={handleStartDateChange} />
        <Calendar aria-label="Date (Uncontrolled)" onChange={handleEndeDateChange} />
      </div>
    </div>
  );
}
