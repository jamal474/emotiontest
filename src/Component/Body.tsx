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
import { useEffect, useState } from 'react'

interface MethodDetails {
    isLoaded: boolean,
    runner: string
}
type TrainingState = Record<string, MethodDetails>;

const Body = () => {
    const [method, setMethod] = useState<string>("lsvc");
    const [state, setState] = useState<TrainingState>({
        "lsvc": {isLoaded: false, runner: "run_prediction_lsvc"}
    });
    
    // useEffect(() => {

    //     if(state[method]?.isLoaded === false)
    //     {
            
    //     }

    // }, [method]);

    return (
        <div className = "w-full h-dvh grid grid-cols-16 gap-3 md:grid-cols-8 md:gap-4 justify-items-center content-center items-center [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]">
            <Input className = "h-fit text-sm lg:text-2xl col-start-2 col-span-8 self-end md:self-auto md:col-start-2 md:col-span-4 shadow-shadow" type="text" id="text-input" placeholder="Enter some text"/>
            <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="shadow-shadow w-[140px] md:w-[220px] lg:w-[280px] col-span-7 md:col-span-2 text-xs md:text-sm lg:text-xl h-fit flex-none ">
                    <SelectValue placeholder="Select a Training Method"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel className='text-xs md:text-sm lg:text-xl'>Methodologies</SelectLabel>
                    <SelectItem value="lsvc" className='text-xs md:text-sm lg:text-xl'>LSVC with tfdif</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ScrollArea id="emotion-output" className= "col-start-2 col-span-8 md:col-span-4 md:col-start-2 justify-self-end rounded-base h-10 md:h-fit w-[150px] md:w-[250px] lg:w-[350px] text-xs md:text-sm lg:text-xl border-2 border-border bg-main p-2 shadow-shadow">
                Emotion : 
            </ScrollArea>
            <Button className = "text-xs md:text-sm lg:text-xl w-[140px] md:w-[220px] lg:w-[280px] col-span-7 md:col-span-2 hover:cursor-pointer" id="predict-button" py-click={state[method]?.runner}>Predict Emotion</Button>

        </div>
    );
}

export default Body;