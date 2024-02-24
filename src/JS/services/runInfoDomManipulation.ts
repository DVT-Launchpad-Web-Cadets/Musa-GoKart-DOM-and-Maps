import { getFileName } from "./api_calls";
import { getLapInfo, getLapRun } from "./runInfo_service";

// I will change the any type later
export function addHeaderInfo(res: any){
    if(res?.lapSummaries?.[0] && res.driver){
        const name: HTMLElement| null = document.querySelector('#driver');
        name!.innerText = res.driver;

        // Safety checks
        document.querySelector('button')!.addEventListener('click', handleChange)

        const select: HTMLElement | null = document.querySelector('select');
        if(select && !select.hasChildNodes()){
            for(let lap in res.lapSummaries){
                const option = document.createElement('option');
                const valueAtr = document.createAttribute('value');
                valueAtr.value = `${lap+1}`;
                option.setAttributeNode(valueAtr);
                option.innerText = `Lap ${lap+1}`;
                select.appendChild(option);
            }
        }
        
        addLapInfo(res.lapSummaries[0]);
    }

}

export function addLapInfo(lapDetails: any){
    const lapInfo: HTMLElement | null = document.querySelector('.lap-info');
    let lapTime = 'DNF';
    if(lapDetails['time lap'] !== null ){
        lapTime = new Date(lapDetails['time lap']).toISOString().slice(11, 19);
    }

    let avg: string | number= "N/A";
    if(lapDetails['Min Speed GPS'] && lapDetails['Max Speed GPS']){
        avg = (lapDetails['Min Speed GPS'] + lapDetails['Max Speed GPS'])/2 + "km/h";
        avg = parseInt(avg) / 10;
    }

    lapInfo!.innerHTML = `
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
        (res: any) => {
            getLapRun(res, getLapNumber());
            getLapInfo(res[0],getLapNumber());
        },
        (err: any) => {
            console.log(err);
        }
    )
}

export function getLapNumber(){
    const select: HTMLSelectElement | null  = document.querySelector('select');
    let option = select!.options[select!.selectedIndex];
    return option.value;
}

export function startSpinner(){
    const loader: HTMLElement | null = document.querySelector('.loader');
    loader!.style.display = 'block';
    loader!.style.zIndex  = '1';

    const page: HTMLElement | null  = document.querySelector('.info-page-elements');
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
    

    const loader: HTMLElement | null  = document.querySelector('.loader');
    loader!.style.display = 'none';

    const page: HTMLElement | null  = document.querySelector('.info-page-elements');
    if(page){
        page.style.justifyContent = "flex-start";
    }
    
}

