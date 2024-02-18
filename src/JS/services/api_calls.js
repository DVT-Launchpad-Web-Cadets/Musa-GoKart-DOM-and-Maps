import API_BASE_URL from '../api/api_Base_Url'
import { stopSpinner } from './dom_manipulation';

export function getRunsFileName (callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getInfoFileName (callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getLapFileName (callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getAllRunsCall(filename,callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs/${filename}`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() =>{stopSpinner()})
}

export function getLapInfoCall(filename, lap, callBack, errorCallBack){
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