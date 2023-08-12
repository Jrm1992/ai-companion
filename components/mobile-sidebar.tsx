import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-secondary p-0 pt-10">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
