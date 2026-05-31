// import { getSession } from "@/lib/auth/auth";
// import { Briefcase } from "lucide-react";
// import Link from "next/link";

// export default function Navbar() {
//   //const session = await getSession();
//   return (
//     //Structure of the navbar is defined here. You can customize it as needed.✅ Purpose of <nav>
//     //It tells the browser and screen readers: “This section contains navigation/menu links.”
//     <nav className="border-b border-gray-200 bg-white">
//       {/* Add your navbar content here*/}
//       <div className="container mx-auto flex items-center h-16 px-4">
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-lg font-semibold text-primary"
//         >
//           <Briefcase className="w-6 h-6 text-primary" />
//           Apply & Track
//         </Link>
//         {/* You can add more links or buttons here */}
//         <div className="ml-auto flex items-center gap-4">
//           <Link href={"/sign-in"}>
//             <button className="text-gray-700 hover:text-black">Login</button>
//           </Link>
//           <Link href={"/sign-up"}>
//             <button className="bg-background text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium">
//               Start Free
//             </button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
