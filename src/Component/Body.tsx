import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Body(){
    return (
        <div className = "w-full h-dvh grid grid-cols-8 gap-4 justify-items-center content-center items-center [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]">
            <Input className = "text-input h-fit text-2xl col-start-2 col-span-4 shadow-shadow" type="text" id="text-input" placeholder="Enter some text"/>
            <Select>
                <SelectTrigger className=" shadow-shadow w-[280px] col-span-2 text-xl h-fit flex-none ">
                    <SelectValue placeholder="Select a Training Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Methodologies</SelectLabel>
                    <SelectItem value="lsvc">LSVC with tfdif</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ScrollArea id="emotion-output" className= "col-span-4 col-start-2 justify-self-end rounded-base h-fit w-[350px] text-xl border-2 border-border bg-main p-2 shadow-shadow">
                Emotion : 
            </ScrollArea>
            <Button className = "text-xl w-[280px] col-span-2 hover:cursor-pointer" id="predict-button" py-click="run_prediction">Predict Emotion</Button>
        </div>
    );
}

export default Body;