import API_BASE_URL from '../api/api_Base_Url'

// I will change the any type later
export function getFileName (callBack: any, errorCallBack: any){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getAllRunsCall(filename: any, callBack: any, errorCallBack: any, finallyCallBack: any){
    fetch(`${API_BASE_URL}/runs/${filename}`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() => {
        finallyCallBack();
    })
}

export function getLapInfoCall(filename: any, lap: any, callBack: any, errorCallBack: any,finallyCallBack: any){
    fetch(`${API_BASE_URL}/runs/${filename}/laps/${lap}`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() => {
        finallyCallBack();
    })
}