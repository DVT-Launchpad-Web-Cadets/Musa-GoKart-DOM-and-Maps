import { drawLap } from "../map/runInfoMap";
import { getAllRunsCall, getFileName, getLapInfoCall } from "./api_calls";
import { addHeaderInfo, getLapNumber, addLapInfo } from "./dom_manipulation";

export function getAllRuns(filename){
    if(filename?.[0]){
        getAllRunsCall(
            filename[0],
            (res) => {
                addHeaderInfo(res);  
                getLapInfo(filename[0],1);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export function getLapRun(res, lap){
    console.log('lap res',res)
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res) => {
                addLapInfo(res.lapSummaries[lap-1]);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export function getLapInfo(filename, lap){
    console.log('lappp',lap)
    getLapInfoCall(
        filename,
        lap,
        (res) => {
            if(res?.dataSet?.[0]){
                drawLap(res.dataSet)
            }
        },
        (err) => {
            console.error(err);
        }
    )
}

getFileName(
    (res) => {
        getAllRuns(res);
    },
    (err) => {
        console.log(err);
    }
)





