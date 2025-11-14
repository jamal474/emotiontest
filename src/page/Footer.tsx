import { RxExternalLink } from "react-icons/rx";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <div className = "sticky bottom-0 w-full h-auto pt-1 pb-1 md:pt-2 md:pb2 lg:pt-5 lg:pb-5 text-center bg-background align-middle shadow-[0_-3px_0px_rgb(1_1_1)]">
            <div className = "hover:cursor-pointer flex items-center justify-center">
                <h4 className="font-unbounded">Made by <a href="https://shabbirjamal.com" className="hover:text-main">Sabo</a></h4>
            </div>
        </div>
    );
}

export default Footer;