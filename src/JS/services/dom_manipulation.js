import {changeDateFormat} from '../helpers/helpers'
import { getFileName} from "./api_calls";
import { getAllRuns, getLapInfo, getLapRun } from './runInfo_service';

export function addRunsToDom(res){
    const runList = document.querySelector('.run-list');
    
    if(res?.trackName && res.driver && res.date){
        const listItem = document.createElement('li');

        const date = changeDateFormat(res.date);

        listItem.innerHTML =`
            <a href="runInfo.html">
                <div class="run-item">
                    <div class="main-card-content">
                        <p class="driver-name"> ${res.driver} </p>
                        <p class="track-name"> ${res.trackName} </p>
                    </div>
                    <div class="card-tail">
                        <p class="run-date">${date}</p>
                        <span>•</span>
                    </div>
                </div>
            </a>`
        
        runList.appendChild(listItem);
    }
}

export function addHeaderInfo(res){
    const header = document.querySelector('.run-page-title');

    if(res?.lapSummaries?.[0] && res.driver){
        console.log('inside')
        const name = document.querySelector('#driver');
        name.innerText = res.driver;

        document.querySelector('button').addEventListener('click', handleChange)
        // const form = document.createElement('form');
        // const actionAtr = document.createAttribute('action');
        // actionAtr.value = ''

        const select = document.querySelector('select');
        // const onChange = document.createAttribute('onchange');
        // onChange. = 'handleChange()';
        // select.setAttributeNode(onChange);
        
        let index = 0;
        console.log('len',res.lapSummaries.length)
        for(let lap of res.lapSummaries){
            const option = document.createElement('option');
            const valueAtr = document.createAttribute('value');
            valueAtr.value = `${index+1}`;
            option.setAttributeNode(valueAtr);
            option.innerText = `Lap ${index+1}`;
            select.appendChild(option);
            index++;
        }
        }

}

export function addLapInfo(lapDetails){
    const lapInfo = document.querySelector('.lap-info');

    const lapTime = new Date(lapDetails['time lap']).toISOString().slice(11, 19);
    const avg = (lapDetails['Min Speed GPS'] + lapDetails['Max Speed GPS'])/2;
    lapInfo.innerHTML = `
        <div class="lap-detail lap-time">
        <span>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            Lap time:
        </span>
        ${lapTime}
        </div>
        <div class="lap-detail avg-speed">
            <span>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                Avg Speed:
            </span>
            ${avg}units
        </div>`
}

export function handleChange() {
    console.log('change')
    getFileName(
        (res) => {
            getLapRun(res);
            getLapInfo(res[0],getLapNumber());
        },
        (err) => {
            console.log(err);
        }
    )
}

export function getLapNumber(){
    const select = document.querySelector('select');
    let option = select.options[select.selectedIndex];
    // document.getElementById('#selector').value = option.value;
    // console.log('val',option.value)
    return 1//option.value;
}

export function startSpinner(){
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    const page = document.querySelector('.page-elements');
    if(page){
        page.style.justifyContent = "center";
    }
}

export function stopSpinner(){
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    const page = document.querySelector('.page-elements');
    if(page){
        page.style.justifyContent = "flex-start";
    }
    
}

