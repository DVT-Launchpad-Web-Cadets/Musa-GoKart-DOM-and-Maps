import API_BASE_URL from '../api/api_Base_Url'

export function getFileName (callBack, errorCallBack){
    fetch(`${API_BASE_URL}/runs`)
    .then(response => response.json())
    .then(responseJson => {
        callBack(responseJson);
    })
    .catch(err => errorCallBack(err))
    .finally(console.log("done"))
}

export function getAllRunsCall(filename,callBack, errorCallBack){
    console.log(`${API_BASE_URL}/runs/${filename}`)
    fetch(`${API_BASE_URL}/runs/${filename}`)
    .then(response => response.json())
    .then(responseJson =>{
        callBack(responseJson);
    })
    .catch(err => console.error(err))
    .finally(console.log('done'))
}