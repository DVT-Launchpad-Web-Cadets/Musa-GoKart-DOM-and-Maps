import API_BASE_URL from '../api/api_Base_Url'
import { KartRun } from '../models/KartRun';
import { LapDetails } from '../models/lapDetials';

export function getFileName ( callBack: (s: string[]) => void, errorCallBack: (e: Error) => void){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then((responseJson: string[]) => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
}

export function getAllRunsCall(filename: string, callBack: (run: KartRun) => void, errorCallBack: (e: Error) => void, finallyCallBack: () => void){
    fetch(`${API_BASE_URL}/runs/${filename}`)
    .then(response => response.json())
    .then((responseJson: KartRun) => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() => {
        finallyCallBack();
    })
}

export function getLapInfoCall(filename: string, lap: number, callBack: (run: LapDetails) => void, errorCallBack: (e: Error) => void, finallyCallBack: () => void){
    fetch(`${API_BASE_URL}/runs/${filename}/laps/${lap}`)
    .then(response => response.json())
    .then((responseJson: LapDetails) => {
        callBack(responseJson)
    })
    .catch(err => errorCallBack(err))
    .finally(() => {
        finallyCallBack();
    })
}