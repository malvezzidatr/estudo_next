import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-1 bg-blue-900 flex items-center justify-center relative">
        <div className="bg-white min-h-96 w-5/6 relative top-16 border flex p-4">
          <div className="border flex items-center justify-between flex-col h-72 w-96 p-3">
            <h1>Teste</h1>
            <div className="flex items-center justify-center">
              <h1 className="text-5xl">8</h1>
            </div>
            <button className="w-full h-10 bg-blue-900 rounded text-white hover:opacity-90 transition duration-300">
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
      <div className="h-4/6 bg-white">

      </div>
    </div>
  );
}
