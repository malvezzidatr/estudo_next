"use client"
import { DateRangePicker } from "@nextui-org/date-picker";
import { useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
  const [sprintDays, setSprintDays] = useState<string[]>([]);
  const [days, setDays] = useState<any>();
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
    <section className="h-screen items-center flex pt-8 flex-col bg-white">
      <div className="flex flex-col w-3/6 relative mb-8">
        <div className="h-20 shadow rounded-xl flex w-full items-center justify-between border-2 border-primary-100">
          <input placeholder="Número da Sprint" className="bg-primary-50 pl-5 rounded-xl w-2/4 h-full outline-none placeholder:text-primary-500"/>
          <div className="h-8 w-0.5 rounded-full bg-primary-200 m-2" />
          <DateRangePicker
            ref={dateRangePickerRef}
            isOpen={isOpenDatePicker}
            onChange={value => setDays(value)}
            visibleMonths={3}
            label="Início e fim"
            color="primary"
            size="lg"
            classNames={{
              base: "h-full w-3/4 bg-primary-50 flex justify-center rounded-xl",
              inputWrapper: "h-full"

            }}
          />
          <button
            onClick={() => calculateWhenSprintEnds(days)}
            className="rounded-full absolute right-0 mr-2 h-14 bg-primary-500 w-32 text-white font-bold hover:bg-green-600 duration-200"
          >
            Sprint
          </button>
        </div>
      </div>
      {
        sprintDays.length > 0 ? (
          <div className="w-11/12 flex flex-col items-center rounded-md border border-primary-200 shadow">
            <div className="flex items-center w-full">
              <div className="flex w-48 h-20 items-center justify-center bg-primary-50 rounded-tl-md">
                <p className="text-black">Demandas</p>
              </div>
              {
                sprintDays.map((day, index) => (
                  <>
                    <div className="h-full flex items-center rounded border-t border-b bg-primary-50">
                      <div className="h-2/4 w-0.5 bg-primary-200" />
                    </div>
                    <div className={`flex flex-1 h-20 items-center justify-center bg-primary-50 ${sprintDays[index + 1] === undefined && 'rounded-tr-md'}`}>
                      <p className="text-black">{day}</p>
                    </div>
                    
                  </>
                ))
              }
            </div>
            <button className="flex items-center justify-evenly pl-3 pr-3 w-64 h-14 rounded-full bg-green-500 text-white m-6 hover:bg-green-600 duration-200">
              <span><CiCirclePlus size={35} color="#fff"/></span> Adicionar demanda
            </button>
          </div>
        ) : (
          <div className="w-11/12 h-3/5 flex justify-center items-center rounded-md border border-primary-200 bg-primary-50 shadow">

          </div>
        )
      }
    </section>
  );
}
