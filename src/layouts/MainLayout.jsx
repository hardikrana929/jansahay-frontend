import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
