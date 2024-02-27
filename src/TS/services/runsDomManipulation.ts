import {changeDateFormat} from '../helpers/helpers';
import { KartRun } from '../models/KartRun';

export function addRunsToDom(res: KartRun){
    const runList: HTMLElement | null = document.querySelector('.run-list');
    
    if(runList && res?.trackName && res.driver && res.date){
        const listItem = document.createElement('li');

        const date = changeDateFormat(res.date);

        listItem.innerHTML =`
            <a href="runInfo.html">
                <div class="run-item">
                    <div class="main-card-content">
                        <p class="driver-name"> ${res.driver} </p>
                        <p class="track-name"> ${res.trackName} • ${res.lapSummaries.length} laps </p>
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

export function stopSpinner(){
    const loader: HTMLElement | null = document.querySelector('.loader');
    
    if(!loader){
        throw new Error("Seems like an error from our side!");
    }
    loader.style.display = 'none';

    const page: HTMLElement | null = document.querySelector('.info-page-elements');
    if(!page){
        throw new Error("Seems like an error from our side!");
    }
    page.style.justifyContent = "flex-start";
    
}