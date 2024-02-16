import { drawLap } from "../map/runInfoMap";
import { getAllRunsCall, getFileName, getLapInfoCall } from "./api_calls";
import { addHeaderInfo, getLapNumber } from "./dom_manipulation";

function getAllRuns(res){
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res) => {
                addHeaderInfo(res);

                
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

function getLapInfo(filename, lap){
    getLapInfoCall(
        filename,
        lap,
        (res) => {
            console.log('res',res.dataSet);
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





