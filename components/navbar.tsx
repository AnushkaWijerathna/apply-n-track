import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    //Structure of the navbar is defined here. You can customize it as needed.✅ Purpose of <nav>
    //It tells the browser and screen readers: “This section contains navigation/menu links.”
    <nav className="border-b border-gray-200 bg-white">
      {/* Add your navbar content here*/}
      <div className="container mx-auto flex items-center h-16 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <Briefcase className="w-6 h-6" />
          Apply & Track
        </Link>
        {/* You can add more links or buttons here */}
        <div className="ml-auto flex items-center gap-4">
          <Link href={"/sign-in"}>
            <button className="text-gray-700 hover:text-black">Login</button>
          </Link>
          <Link href={"/sign-up"}>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium">
              Start Free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
