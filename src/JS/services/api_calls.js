import API_BASE_URL from '../api/api_Base_Url'


export function getFileName (callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getAllRunsCall(filename, callBack, errorCallBack, finallyCallBack){
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

export function getLapInfoCall(filename, lap, callBack, errorCallBack,finallyCallBack){
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