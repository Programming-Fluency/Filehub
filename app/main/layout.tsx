import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-8">{children}</main>
      <Footer />
    </div>
  );
}
