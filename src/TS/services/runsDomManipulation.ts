import {changeDateFormat} from '../helpers/helpers';

// I will change the any type later
export function addRunsToDom(res: any){
    const runList: HTMLElement | null = document.querySelector('.run-list');
    
    if(res?.trackName && res.driver && res.date){
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
        
        runList!.appendChild(listItem);
    }
}

export function stopSpinner(){
    const loader: HTMLElement | null = document.querySelector('.loader');
    loader!.style.display = 'none';

    const page: HTMLElement | null = document.querySelector('.info-page-elements');
    if(page){
        page.style.justifyContent = "flex-start";
    }
    
}