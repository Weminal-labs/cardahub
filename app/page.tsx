import Navbar from "./components/Navbar";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <div>
        <Navbar />
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vent It</h1>
        <ThemeToggle />
      </div>
    </div>
  );
}
