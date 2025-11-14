import { Button } from "@/components/ui/button"
import { LuGithub } from "react-icons/lu";

const Header = () => {
  
  return (
    <div className="sticky bg-background top-0 w-full h-auto pt-2 pb-2 lg:pt-5 lg:pb-5 grid grid-cols-10 items-center shadow-[0_3px_0px_rgb(1_1_1)]">
      <h2 className="text-l md:text-2xl lg:text-3xl col-start-2 col-span-4 font-unbounded lg:col-start-2 lg:col-span-5">Detect Text Emotion</h2>
      <a className="col-start-9 md:col-start-9 col-span-1 lg:col-start-9" href="https://github.com/jamal474/emotiontest">
        <Button size="icon" className=" md:hidden hover:cursor-pointer">
          <LuGithub className="hover:cursor-pointer"/>
        </Button>
        <Button className="hidden md:flex justify-self-center hover:cursor-pointer">
          <LuGithub className="hover:cursor-pointer"/> Github
        </Button>
      </a>
      </div>
  );
}

export default Header;
