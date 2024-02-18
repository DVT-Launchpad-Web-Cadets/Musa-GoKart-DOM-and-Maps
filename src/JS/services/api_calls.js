import API_BASE_URL from '../api/api_Base_Url'
import { stopSpinner } from './dom_manipulation';

export function getFileName (callBack, errorCallBack){
    console.log('getFIle')
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getAllRunsCall(filename,callBack, errorCallBack){
    console.log('getAllRunsCall')
    fetch(`${API_BASE_URL}/runs/${filename}`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() =>{stopSpinner()})
}

export function getLapInfoCall(filename, lap, callBack, errorCallBack){
    console.log('getLapInfoCall')
    console.log(`${API_BASE_URL}/runs/${filename}/laps/${lap}`)
    fetch(`${API_BASE_URL}/runs/${filename}/laps/${lap}`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() => {
        stopSpinner()
    })
}