import { drawLap } from "../map/runInfoMap";
import { getAllRunsCall, getFileName, getLapInfoCall } from "./api_calls";
import { addHeaderInfo, getLapNumber, addLapInfo } from "./dom_manipulation";

export function getAllRuns(res){
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res) => {
                addHeaderInfo(res);  
                addLapInfo(res.lapSummaries[0]);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export function getLapRun(res){
    console.log('lap res',res)
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res) => {
                addLapInfo(res.lapSummaries[1]);
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
            console.error();
        }
    )
}

getFileName(
    (res) => {
        getAllRuns(res);
        getLapInfo(res[0],getLapNumber());
    },
    (err) => {
        console.log(err);
    }
)





