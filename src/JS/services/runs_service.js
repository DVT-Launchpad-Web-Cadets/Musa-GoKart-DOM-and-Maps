import { getAllRunsCall, getFileName } from "./api_calls";
import { addRunsToDom } from "./dom_manipulation";

getFileName(
    (res) => {
        getAllRuns(res) 
    },
    (err) => {
        console.log(err);
    }
)

function getAllRuns(res){
    if(res?.[0]){
        getAllRunsCall(
            res[0],
            (res) => {
                addRunsToDom(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}




