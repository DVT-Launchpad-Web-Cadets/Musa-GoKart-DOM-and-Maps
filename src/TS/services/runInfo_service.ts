import { drawLap } from "../map/runInfoMap";
import { getFileName, getAllRunsCall, getLapInfoCall } from "./api_calls";
import { addHeaderInfo, addLapInfo, stopSpinner } from "./runInfoDomManipulation";

// I will change the any type later
export function getAllRunsInfo(filename: string[]){
    if(filename?.[0]){
        getAllRunsCall(
            filename[0],
            (res: any) => {
                addHeaderInfo(res);  
                getLapInfo(filename[0],1);
            },
            (err: any) => {
                console.log(err);
            },
            () => {
                stopSpinner();
            }
            
        )
    }
}

export function getLapRun(res: any, lap: any){
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res: any) => {
                addLapInfo(res.lapSummaries[lap-1]);
            },
            (err: any) => {
                console.log(err);
            },
            () => {
                stopSpinner();
            }
            
        )
    }
}

export function getLapInfo(filename: any, lap: any){
    getLapInfoCall(
        filename,
        lap,
        (res: any) => {
            if(res?.dataSet?.[0]){
                drawLap(res.dataSet)
            }
        },
        (err: any) => {
            console.error(err);
        },
        () => {
            stopSpinner();
        }
    )
}
function initialisePage(){
    getFileName(
        (res: any) => {
            getAllRunsInfo(res);
        },
        (err: any) => {
            console.log(err);
        }
    )
}

initialisePage();




