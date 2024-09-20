"use client";
import { DateRangePicker } from "@nextui-org/date-picker";
import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

export const ModalExample = ({ isOpen, closeModal, addDemands, demandsName, setDemandName }: any) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-1/3">
            <h2 className="text-xl font-bold mb-4 text-black">Adicionar Demanda</h2>
            <p className="mb-4 text-black">Insira os detalhes da nova demanda aqui.</p>
            <input className="text-primary-500" placeholder="Nome da demanda" value={demandsName} onChange={e => setDemandName(e.target.value)} />
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Fechar
            </button>
            <button
              onClick={addDemands}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Criar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [sprintDays, setSprintDays] = useState<string[]>([]);
  const [days, setDays] = useState<any>();
  const [sprintNumber, setSprintNumber] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [demands, setDemands] = useState<any[]>([]);
  const [demandsName, setDemandsName] = useState<string>('');
  const [frontEnd, setFrontEnd] = useState({
    start: '2024-09-03',
    end: '2024-09-05',
  });
  const [stackDates, setStackDates] = useState<Map<any, any>>();
  const dateRangePickerRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const addDemands = () => {
    setDemands(props => [...props, demandsName])
    compareDates();
  }

  const compareDates = () => {
    const map = new Map();
    sprintDays.map((day, index) => {
      const [daySplitted, monthSplitted] = day.split('/');
      const dayNumber = parseInt(daySplitted, 10);
      const monthNumber = parseInt(monthSplitted, 10);
      const date = new Date(2024, monthNumber - 1, dayNumber);

      
      const frontEndStartSplitted = frontEnd.start.split('-');
      const frontEndDayStart = parseInt(frontEndStartSplitted[2], 10)
      const frontEndMonthStart = parseInt(frontEndStartSplitted[1], 10)
      const frontEndyearStart = parseInt(frontEndStartSplitted[0], 10)
      const frontStartDate = new Date(frontEndyearStart, frontEndMonthStart - 1, frontEndDayStart);

      const frontEndSplittedEndDay = frontEnd.end.split('-');
      const frontEndDayEnd = parseInt(frontEndSplittedEndDay[2], 10)
      const frontEndMonthEnd = parseInt(frontEndSplittedEndDay[1], 10)
      const frontEndyearEnd = parseInt(frontEndSplittedEndDay[0], 10)

      const frontEndDate = new Date(frontEndyearEnd, frontEndMonthEnd - 1, frontEndDayEnd);

      if(frontStartDate > date) {
        map.set('void', (map.get('void') || 0) + 1);
      } else if (frontEndDate >= date) {
        map.set('work', (map.get('work') || 0) + 1); 
      }
    });
    setStackDates(map);
  };

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
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}`;
  }

  const calculateWhenSprintEnds = (value: any) => {
    const sprintDays = [];
    const startDate = new Date(value.start.year, value.start.month - 1, value.start.day);
    const end = new Date(value.end.year, value.end.month - 1, value.end.day);

    while (startDate <= end) {
      sprintDays.push(adjustSprintDay(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    setSprintDays(sprintDays);
  }

  const getVoidMargin = (voidCount: any) => {
    switch (voidCount) {
      case 1:
        return 'ml-1-voids';
      case 2:
        return 'ml-2-voids';
      case 3:
        return 'ml-3-voids';
      case 4:
        return 'ml-4-voids';
      case 5:
        return 'ml-5-voids';
      default:
        return '0rem';
    }
  };

  return (
    <section className="h-screen items-center flex pt-8 flex-col bg-white">
      <div className="flex flex-col w-3/6 relative mb-8">
        <div className="h-28 shadow rounded-xl flex w-full items-center justify-between border-2 border-primary-100">
          <input 
            onChange={e => setSprintNumber(e.target.value)} 
            placeholder="Número da Sprint" 
            className="bg-primary-50 pl-5 font-bold text-xl text-primary-500 rounded-xl w-2/4 h-full outline-none placeholder:text-primary-500"
          />
          <div className="w-0.5 rounded-full bg-primary-200 m-2" />
          <DateRangePicker
            ref={dateRangePickerRef}
            isOpen={isOpenDatePicker}
            onChange={value => setDays(value)}
            visibleMonths={3}
            label="Início e fim"
            color="primary"
            size="lg"
            classNames={{
              base: "h-full w-3/4 bg-primary-50 flex justify-center rounded-xl font-bold text-xl",
              inputWrapper: "h-full"
            }}
          />
          <motion.button
            onClick={() => calculateWhenSprintEnds(days)}
            className="rounded-full absolute right-0 mr-1 h-14 bg-primary-500 w-40 text-white font-bold hover:bg-green-600 duration-200"
          >
            Sprint
          </motion.button>
        </div>
      </div>

      {sprintDays.length > 0 && (
        <AnimatePresence mode="wait">
          <h1 className="text-primary-500 font-bold mb-5 text-5xl">Sprint {sprintNumber}</h1>
          <motion.div
            key='sprintDays'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-11/12 flex flex-col items-center rounded-md border border-primary-200 shadow"
          >
            <div className="flex w-full">
              <div className="flex w-48 h-20 items-center justify-center bg-primary-50 rounded-tl-md">
                <p className="text-black">Demandas</p>
              </div>
              {
                sprintDays.map((day, index) => (
                  <React.Fragment key={index + day}>
                    <div className="h-20 flex items-center rounded border-t border-b bg-primary-50">
                      <div className="h-2/4 w-0.5 bg-primary-200" />
                    </div>
                    <div className={`flex flex-1 h-20 items-center justify-center bg-primary-50 ${sprintDays[index + 1] === undefined && 'rounded-tr-md'}`}>
                      <p className="text-black">{day}</p>
                    </div>
                  </React.Fragment>
                ))
              }
            </div>
            {
              demands.map((item, index) => {
                return (
                  <div
                    key={item}
                    className={`${index % 2 ? 'bg-primary-50' : 'bg-white'} h-20 text-black w-full flex`}
                  >
                    <div className="w-56 h-24 text-center flex items-center justify-center">
                      <p>{item}</p>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className={`${getVoidMargin(stackDates?.get('void'))} rounded bg-red-500 w-56 h-8`}></div>
                      <div className="bg-green-500 w-full h-8 rounded"></div>
                      <div className="bg-blue-500 w-full h-8 rounded"></div>
                    </div>
                  </div>
                )
              })
            }
            <button
              onClick={openModal} 
              className="flex items-center justify-evenly pl-3 pr-3 w-64 h-14 rounded-full bg-green-500 text-white m-6 hover:bg-green-600 duration-200"
            >
              <span><CiCirclePlus size={35} color="#fff"/></span> Adicionar demanda
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      <ModalExample isOpen={isOpenModal} closeModal={closeModal} addDemands={addDemands} demandsName={demandsName} setDemandName={setDemandsName} />
    </section>
  );
}
