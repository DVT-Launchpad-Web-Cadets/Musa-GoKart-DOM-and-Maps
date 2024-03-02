import { KartRun, LapSummary } from '../models/KartRun';

export function addHeaderInfo(res: KartRun, resetCallBack: () => void) {
  if (!(res?.driver && res.sessionName)) {
    throw new Error('Error loading content');
  }

  const name: HTMLElement | null = document.querySelector('#driver');

  if (!name) {
    throw new Error('Seems like an error from our side!');
  }

  name.innerText = `${res.driver} - ${res.sessionName}`;

  const resetButton = document.querySelector('#reset-btn');
  if (!resetButton) {
    throw new Error('Seems like an error from our side!');
  }

  resetButton.addEventListener('click', resetCallBack);
}

export function addLapInfo(
  lapSummaries: LapSummary[],
  startCallback: () => void,
) {
  const startButton = document.querySelector('#start-btn');
  if (!startButton) {
    throw new Error('Seems like an error from our side!');
  }
  startButton.addEventListener('click', startCallback);

  const lapList = document.querySelector('.laps');

  if (!lapList) {
    throw new Error('Seems like an error from our side!');
  }

  if (!lapSummaries?.[0]) {
    throw new Error('Seems like an error from our side!');
  }

  let index = 0;
  for (const lap of lapSummaries) {
    const lapInfoItem = document.createElement('li');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `${index + 1}`);
    input.setAttribute('value', `${index + 1}`);

    const label = document.createElement('label');

    let lapTime = 'DNF';
    if (lap['time lap']) {
      lapTime = new Date(lap['time lap']).toISOString().slice(11, 19);
    }

    let avg: string = 'N/A';
    if (lap['Min Speed GPS'] && lap['Max Speed GPS']) {
      avg = (lap['Min Speed GPS'] + lap['Max Speed GPS']) / 2 + 'km/h';
      avg = `${parseInt(avg) / 10} km/h`;
    }

    label.innerHTML = `
      <p>${index}</p>
      <span class="time">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <p>${lapTime}</p>
      </span>
      <span class="speed">
          <i class="fa fa-signal" aria-hidden="true"></i>
          <p>${avg}</p>
      </span>
     `;

    lapInfoItem.appendChild(input);
    lapInfoItem.appendChild(label);

    lapList.appendChild(lapInfoItem);
    index++;
  }
}

export function getCheckedLaps() {
  const lapList = document.querySelectorAll('input');

  if (!lapList) {
    throw new Error('Seems like an error from our side!');
  }

  const lapArray: number[] = [];
  for (const lap of lapList) {
    if (!lap.checked) {
      continue;
    }
    const lapNumber = lap.getAttribute('value');
    if (lapNumber && !isNaN(Number(lapNumber))) {
      lapArray.push(Number(lapNumber));
    }
  }

  return lapArray;
}

export function startSpinner() {
  const loader: HTMLElement | null = document.querySelector('.loader');
  if (!loader) {
    throw new Error('Seems like an error from our side!');
  }
  loader.style.display = 'block';

  const page: HTMLElement | null = document.querySelector(
    '.info-page-elements',
  );
  if (!page) {
    throw new Error('Seems like an error from our side!');
  }
  page.style.justifyContent = 'flex-start';
}

export function stopSpinner() {
  const resetButton: HTMLElement | null = document.querySelector('#reset-btn');
  if (!resetButton) {
    throw new Error('Seems like an error from our side!');
  }
  resetButton.style.display = 'block';

  const startButton: HTMLElement | null = document.querySelector('#start-btn');
  if (!startButton) {
    throw new Error('Seems like an error from our side!');
  }
  startButton.style.display = 'block';

  const loader: HTMLElement | null = document.querySelector('.loader');
  if (!loader) {
    throw new Error('Seems like an error from our side!');
  }
  loader.style.display = 'none';

  const page: HTMLElement | null = document.querySelector(
    '.info-page-elements',
  );
  if (!page) {
    throw new Error('Seems like an error from our side!');
  }
  page.style.justifyContent = 'flex-start';
}
