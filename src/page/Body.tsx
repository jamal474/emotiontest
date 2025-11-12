import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from "@/components/ui/spinner"
import { Progress } from "@/components/ui/progress"
import BodySkeleton from './BodySkeleton';
import { useState, useEffect, useRef } from 'react';
import { pyodideService } from '@/services/pyodideService';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MyModelApiModule {
    load_model: (filename: string) => any;
    predict: (filename: string, text: string) => any;
}
type ModelId = 'lsvc_pipeline';

const ModelNameMap: Record<ModelId, string> = {
    'lsvc_pipeline': 'Linear SVC with TF-IDF',
};
const Body = () => {

    const [isPyReady, setIsPyReady] = useState(false);
    const [isLoadingModel, setIsLoadingModel] = useState(false);
    const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
    const [currentModel, setCurrentModel] = useState('');
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const modelName = {

    }
    
    useEffect(() => {
        const handleProgress = (msg: string) => {
        console.log("Pyodide Progress:", msg);
        setProgress((val) => {return val + 10;});
        };

        setProgress(val => { return val + 1});
        pyodideService.init({ onProgress: handleProgress })
            .then(() => {
                setProgress(val => {return 100;});
                setIsPyReady(true);
            })
            .catch(err => {
                console.error("Failed to initialize Pyodide service:", err);
                setError("Python environment failed to load.");
                setProgress(val => {return 100;});
            });
    }, []); 

  const handleModelChange = async (modelId: string) => {
    if (!modelId) {
      setCurrentModel('');
      return;
    }

    setCurrentModel(modelId);

    if (!pyodideService.isReady()) {
        setError("Python is not ready.");
        setCurrentModel('');
        return;
    }

    setIsLoadingModel(true);
    setError('');
    setPrediction('');
    setProgress(val => {return 10;});
    
    const progressInterval = setInterval(() => {
      setProgress(val => {return val + 5;})
    }, 200);
    
    try {
      const result = await pyodideService.loadModel(`${modelId}.pkl`);

      if (result.status === 'loaded' || result.status === 'cached') {
      } else {
        setError(result.message || "Failed to load model.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(progressInterval);
      setProgress(val => {return 100;});
      setIsLoadingModel(false);
    }
  };
  
  const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentModel || !inputText || !pyodideService.isReady()) return;

    setIsLoadingPrediction(true);

    try {
      const result = await pyodideService.predict(currentModel, inputText);

      if (result.status === 'success') {
        setPrediction(result.prediction[0]);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoadingPrediction(false);
    }
  };

    return (
        <>
        { !isPyReady || isLoadingModel ? <Progress value={progress} className="fixed z-0 h-1.5 col-span-8" /> : ""} 
        <div className = "w-full h-dvh grid grid-cols-16 gap-3 md:grid-cols-8 md:gap-4 justify-items-center content-center items-center [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]">
            {
                !isPyReady
                ?
                <BodySkeleton/>
                :
                <>
                <Input className = "h-fit text-sm lg:text-2xl col-start-2 col-span-14 self-end md:self-auto md:col-start-2 md:col-span-4 shadow-shadow" 
                    type="text" id="text-input" placeholder="Enter some text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}/>
                <Select value={currentModel} onValueChange={handleModelChange}>
                    <SelectTrigger className="shadow-shadow md:w-[220px] lg:w-[280px] col-start-2 col-span-14 md:col-span-2 text-xs md:text-sm lg:text-xl h-fit flex-none ">
                        <SelectValue placeholder="Select a Training Method"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel className='text-xs md:text-sm lg:text-xl'>Methodologies</SelectLabel>
                        <SelectItem value="lsvc_pipeline" className='text-xs md:text-sm lg:text-xl'>LSVC with tfdif</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <ScrollArea id="emotion-output" className= "flex content-center justify-items-stretch w-full col-start-2 col-span-7 md:col-span-4 md:col-start-2 md:justify-self-end rounded-base h-9 md:h-fit md:w-[250px] lg:w-[350px] text-xs md:text-sm lg:text-xl border-2 border-border bg-main p-2 shadow-shadow">
                    {
                        isLoadingPrediction || isLoadingModel ? 
                            <Spinner className="size-4 md:size-6 lg:size-7"/> 
                        : 
                            <>
                                {"Emotion : "}
                                {error ? (
                                    <span style={{ color: 'red' }}>{error}</span>
                                ) : (
                                    prediction || '...'
                                )}
                            </>
                    }
                </ScrollArea>
                <Button className = "text-xs md:text-sm lg:text-xl w-full md:w-[220px] lg:w-[280px] h-9 md:h-full col-span-7 md:col-span-2 hover:cursor-pointer" id="predict-button"
                // disabled={!isWorkerReady || isLoadingModel || !currentModel} 
                onClick={handleSubmit}>
                {isLoadingModel ? "Loading Model..." : "Predict Emotion"}
                </Button>
            </>
            }

        </div>
        </>
    );
}

export default Body;