import {
  FigmaLogoIcon,
  FileTextIcon,
  ImageIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Classification from "../Icons/Classification";

const navLinks = [
  {
    name: "Image Generator",
    logo: ImageIcon,
    link: "/",
  },
  {
    name: "Text Summarizer",
    logo: Pencil1Icon,
    link: "/summarize",
  },
  {
    name: "Text Classification",
    logo: Classification,
    link: "/classification",
  },
];
export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen max-sm:hidden w-56 bg-background border-r text-foreground border-solid border-gray-400 shadow shadow-gray-700 px-4">
      <div className="flex items-center h-[70px]   mb-4 space-x-3">
        <img src="/Logo.png" className="  w-6 h-6"></img>
        <h1 className="text-lg font-medium">Gen AI</h1>
      </div>
      <nav className="space-y-2">
        {navLinks.map((item, index) => {
          const Icon = item.logo;
          return (
            <Link
              href={item.link}
              key={index}
              className="w-full flex items-center space-x-2 hover:bg-gray-200 hover:text-background active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <Icon />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
