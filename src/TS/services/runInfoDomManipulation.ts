import { KartRun, LapSummaries } from "../models/KartRun";

export function addHeaderInfo(res: KartRun, changeCallBack: () => void){
    if(res?.lapSummaries?.[0] && res.driver){
        const name: HTMLElement| null = document.querySelector('#driver');

        if(!name){
            throw new Error("Seems like an error from our side!");
        }
        
        name.innerText = res.driver;
        // Safety checks
        const button =  document.querySelector('button');
        if(!button){
            throw new Error("Seems like an error from our side!");
        }
        
        button.addEventListener('click', changeCallBack);

        const select: HTMLElement | null = document.querySelector('select');
        if(select && !select.hasChildNodes()){
            for(let lap in res.lapSummaries){
                const option = document.createElement('option');
                const valueAtr = document.createAttribute('value');
                const lapNumber = Number(lap) + 1;
                valueAtr.value = `${lapNumber}`;
                option.setAttributeNode(valueAtr);
                option.innerText = `Lap ${lapNumber}`;
                select.appendChild(option);
            }
        }else{
            throw new Error("Seems like an error from our side!");
        }
        
        addLapInfo(res.lapSummaries[0]);
    }

}

export function addLapInfo(lapSummaries: LapSummaries){
    const lapInfo: HTMLElement | null = document.querySelector('.lap-info');

    if(!lapInfo){
        throw new Error("Seems like an error from put side!");
    }

    let lapTime = 'DNF';
    if(lapSummaries['time lap']){
        lapTime = new Date(lapSummaries['time lap']).toISOString().slice(11, 19);
    }

    let avg: string | number= "N/A";
    if(lapSummaries['Min Speed GPS'] && lapSummaries['Max Speed GPS']){
        avg = (lapSummaries['Min Speed GPS'] + lapSummaries['Max Speed GPS'])/2 + "km/h";
        avg = parseInt(avg) / 10;
    }

    lapInfo.innerHTML =`
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

// Turn this into a callback from the orchestrator

export function getLapNumber() {
    const select: HTMLSelectElement | null  = document.querySelector('select');

    if(select){
        let option = select.options[select.selectedIndex];
        if(!isNaN(Number(option.value)))
        return Number(option.value);  
    }
    throw new Error("Seems like an error from our side!");
    
}

export function startSpinner(){
    const loader: HTMLElement | null = document.querySelector('.loader');
    if(!loader){
        throw new Error("Seems like an error from our side!");
    }
    loader.style.display = 'block';

    const page: HTMLElement | null  = document.querySelector('.info-page-elements');
    if(!page){
        throw new Error("Seems like an error from our side!");
    }
    page.style.justifyContent = "flex-start";
}

export function stopSpinner(){
    const select = document.querySelector('select');
    if(!select){
        throw new Error("Seems like an error from our side!");
    }
    select.style.display = 'block';

    const button = document.querySelector('button');
    if(!button){
        throw new Error("Seems like an error from our side!");
    }
    button.style.display = 'block';
    

    const loader: HTMLElement | null  = document.querySelector('.loader');
    if(!loader){
        throw new Error("Seems like an error from our side!");
    }
    loader.style.display = 'none';

    const page: HTMLElement | null  = document.querySelector('.info-page-elements');
    if(!page){
        throw new Error("Seems like an error from our side!");
    }
    page.style.justifyContent = "flex-start";
    
}

