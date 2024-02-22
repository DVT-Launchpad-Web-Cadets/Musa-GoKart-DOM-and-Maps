import { getFileName } from "./api_calls";
import { getLapInfo, getLapRun } from "./runInfo_service";

export function addHeaderInfo(res){
    const header = document.querySelector('.run-page-title');

    if(res?.lapSummaries?.[0] && res.driver){
        const name = document.querySelector('#driver');
        name.innerText = res.driver;

        document.querySelector('button').addEventListener('click', handleChange)

        const select = document.querySelector('select');
        if(!select.hasChildNodes()){
            let index = 0;
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
        
        addLapInfo(res.lapSummaries[0]);
    }

}

export function addLapInfo(lapDetails){
    const lapInfo = document.querySelector('.lap-info');
    let lapTime = 'DNF';
    if(lapDetails['time lap'] !== null ){
        lapTime = new Date(lapDetails['time lap']).toISOString().slice(11, 19);
    }

    let avg = "N/A";
    if(lapDetails['Min Speed GPS'] && lapDetails['Max Speed GPS']){
        avg = (lapDetails['Min Speed GPS'] + lapDetails['Max Speed GPS'])/2 + "km/h";
        avg = avg / 10;
    }

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
                <i class="fa fa-signal" aria-hidden="true"></i>
                Avg Speed:
            </span>
            ${avg}
        </div>`
    
}

export function handleChange() {
    startSpinner();
    getFileName(
        (res) => {
            getLapRun(res, getLapNumber());
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
    return option.value;
}

export function startSpinner(){
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    loader.style.zIndex  = '1';

    const page = document.querySelector('.info-page-elements');
    if(page){
        page.style.justifyContent = "flex-start";
    }
}

export function stopSpinner(){
    const select = document.querySelector('select');
    if(select){
        select.style.display = 'block';
    }

    const button = document.querySelector('button');
    if(button){
        button.style.display = 'block';
    }
    

    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    const page = document.querySelector('.info-page-elements');
    if(page){
        page.style.justifyContent = "flex-start";
    }
    
}

