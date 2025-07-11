import Navbar from './components/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Footer from './components/Footer';



export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar />
      <main className="flex justify-center items-center min-h-[calc(100vh-64px)] w-full">
        <div className="text-center">
          <Outlet />
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
