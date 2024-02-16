import {changeDateFormat} from '../helpers/helpers'

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
        const name = document.createElement('span');
        name.innerText = res.driver;
        header.appendChild(name);

        const select = document.createElement('select');
        // const selectValueAtrr = document.createAttribute('onSele')
        // select.setAttribute()
        
        let index = 0;
        for(let lap of res.lapSummaries){
            const option = document.createElement('option');
            const valueAtr = document.createAttribute('value');
            valueAtr.value = `${index}`;
            option.setAttributeNode(valueAtr);
            option.innerText = `Lap ${index+1}`;
            select.appendChild(option);
            index++;
        }

        header.appendChild(select);
    }
    addLapInfo(res.lapSummaries[1]);

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

export function getLapNumber(){
    return 1;
}
