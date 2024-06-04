import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center bg-white">
      <section className="mt-6 h-16 shadow rounded-full flex w-3/6 items-center justify-between relative border-2">
          <input placeholder="Número da Sprint" className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <input placeholder="Início" className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <input placeholder="Termino" className="pl-10 rounded-full flex-1 h-full focus:bg-slate-200 outline-none"/>
          <button className="rounded-full absolute bg-gray-800 w-28 h-3/4 right-0 mr-2 text-white font-bold hover:bg-green-800 transaction duration-500">Sprint</button>
      </section>
    </div>
  );
}
