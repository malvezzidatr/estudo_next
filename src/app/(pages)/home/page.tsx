"use client"
import { DateRangePicker } from "@nextui-org/date-picker";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
  const dateRangePickerRef = useRef<HTMLDivElement>(null);

  const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, handler]);
  };

  useOutsideClick(dateRangePickerRef, () => setIsOpenDatePicker(false));

  const handleInputClick = () => {
    setIsOpenDatePicker(true);
  };

  useEffect(() => {
    if (dateRangePickerRef.current) {
      dateRangePickerRef.current.addEventListener("click", handleInputClick);
    }
    return () => {
      if (dateRangePickerRef.current) {
        dateRangePickerRef.current.removeEventListener("click", handleInputClick);
      }
    };
  }, [dateRangePickerRef]);

  return (
    <section className="h-screen w-screen items-center flex justify-center bg-white">
      <div className="flex flex-col w-3/6 relative">
        <div className="h-20 shadow rounded-xl flex w-full items-center justify-between border-2 border-primary-100">
          <input placeholder="Número da Sprint" className="bg-primary-50 pl-5 rounded-xl flex-1 h-full focus:bg-slate-200 outline-none placeholder:text-primary-500"/>
          <div className="h-8 w-0.5 rounded-full bg-primary-200 m-2" />
          <DateRangePicker
            ref={dateRangePickerRef}
            isOpen={isOpenDatePicker}
            onChange={value => console.log(value)}
            visibleMonths={3}
            label="Início e fim"
            color="primary"
            size="lg"
            classNames={{
              base: "h-full bg-primary-50 flex justify-center rounded-xl",
              inputWrapper: "h-full"

            }}
          />
          <button className="rounded-full absolute right-0 mr-2 h-12 bg-gray-800 w-28 text-white font-bold hover:bg-green-800 transaction duration-500">Sprint</button>
        </div>
      </div>
    </section>
  );
}
