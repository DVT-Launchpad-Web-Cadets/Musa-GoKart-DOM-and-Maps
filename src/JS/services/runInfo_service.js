import { getAllRunsCall, getFileName } from "./api_calls";
import { addHeaderInfo } from "./dom_manipulation";

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
                console.log('res',res);
                addHeaderInfo(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}