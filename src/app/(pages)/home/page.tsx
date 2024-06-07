"use client"
import { DateRangePicker } from "@nextui-org/date-picker";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
  const [sprintDays, setSprintDays] = useState<string[]>([]); 
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

  const adjustSprintDay = (date: Date) => {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth();
    return `${day}/${month}`
  }

  const calculateWhenSprintEnds = (value: any) => {
    const sprintDays = []
    const startDate = new Date(value.start.year, value.start.month - 1, value.start.day);
    const end = new Date(value.end.year, value.end.month - 1, value.end.day);

    while(startDate <= end) {
      sprintDays.push(adjustSprintDay(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    
    setSprintDays(sprintDays);
  }

  return (
    <section className="h-screen w-screen items-center flex justify-center flex-col bg-white">
      <div className="flex flex-col w-3/6 relative">
        <div className="h-20 shadow rounded-xl flex w-full items-center justify-between border-2 border-primary-100">
          <input placeholder="Número da Sprint" className="bg-primary-50 pl-5 rounded-xl w-2/4 h-full outline-none placeholder:text-primary-500"/>
          <div className="h-8 w-0.5 rounded-full bg-primary-200 m-2" />
          <DateRangePicker
            ref={dateRangePickerRef}
            isOpen={isOpenDatePicker}
            onChange={value => calculateWhenSprintEnds(value)}
            visibleMonths={3}
            label="Início e fim"
            color="primary"
            size="lg"
            classNames={{
              base: "h-full w-3/4 bg-primary-50 flex justify-center rounded-xl",
              inputWrapper: "h-full"

            }}
          />
          <button className="rounded-full absolute right-0 mr-2 h-14 bg-primary-500 w-32 text-white font-bold hover:bg-green-600 duration-300">Sprint</button>
        </div>
      </div>
      {
        sprintDays.length > 0 && (
          <div className="w-5/6 flex flex-col items-center rounded-md border">
            <div className="flex items-center w-full">
              <div className="flex w-52 h-20 items-center justify-center bg-gray-100">
                <p className="text-black">Demandas</p>
              </div>
              {
                sprintDays.map((day) => (
                  <>
                    <div className="h-full flex items-center rounded border-t border-b bg-gray-100">
                      <div className="h-2/4 w-0.5 bg-gray-300" />
                    </div>
                    <div className="flex w-24 h-20 items-center justify-center bg-gray-100">
                      <p className="text-black">{day}</p>
                    </div>
                    
                  </>
                ))
              }
            </div>
          </div>
        )
      }
    </section>
  );
}
