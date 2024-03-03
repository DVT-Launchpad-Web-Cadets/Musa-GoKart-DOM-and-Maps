import { changeDateFormat } from '../helpers/helpers';
import { KartRun } from '../models/KartRun';

export function addRunsToDom(res: KartRun) {
  const runList: HTMLElement | null = document.querySelector('.run-list');

  if (runList && res?.trackName && res.driver && res.date) {
    const listItem = document.createElement('li');

    const date = changeDateFormat(res.date);
    listItem.setAttribute(
      'class',
      'bg-secondaryColor border border-borderColor p-4 h-56 rounded-md sm:w-3/6 lg:w-2/6',
    );

    listItem.innerHTML = `
            <a href="runInfo.html" class="h-full block">
                <div class="run-item h-full flex flex-col justify-evenly">
                    <p class="driver-name text-headerColor self-center text-lg font-bold"> ${res.driver} • ${res.sessionName} </p>
                    <p class="track-name"> <i class="fa fa-map-marker text-accentColor" aria-hidden="true"></i> ${res.trackName} • ${res.lapSummaries.length} laps </p>
                    <p class="run-date"><i class="fa fa-calendar text-accentColor" aria-hidden="true"></i> ${date}</p>
                    <p class="run-date"><i class="fa fa-clock-o  text-accentColor" aria-hidden="true"></i> ${res.time}</p>
                </div>
            </a>`;

    runList.appendChild(listItem);
  }
}

export function stopSpinner() {
  const loader: HTMLElement | null = document.querySelector('.loader');

  if (!loader) {
    throw new Error('Seems like an error from our side!');
  }
  loader.style.display = 'none';

  const page: HTMLElement | null = document.querySelector('.page-elements');
  if (!page) {
    throw new Error('Seems like an error from our side!');
  }
  page.style.justifyContent = 'flex-start';
}
