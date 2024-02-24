import { getAllRunsCall, getFileName } from "./api_calls";
import { addRunsToDom, stopSpinner } from "./runsDomManipulation";

// I will change the any type later
getFileName(
    (res: any) => {
        getAllRuns(res) 
    },
    (err: any) => {
        console.log(err);
    }
)

function getAllRuns(filename: string[]){
    if(filename?.[0]){
        getAllRunsCall(
            filename[0],
            (res: any) => {
                addRunsToDom(res);
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




