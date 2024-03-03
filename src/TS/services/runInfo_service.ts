import { MapUtility } from '../map/runInfoMap';
import { KartRun } from '../models/KartRun';
import {
  newFetchRequest$,
  getCoordinatesSubject$,
  lapFetchRequest$,
  finalResult$,
} from './api_calls';
import {
  addHeaderInfo,
  addLapInfo,
  clearCheckBoxes,
  getCheckedLaps,
  startSpinner,
  stopSpinner,
} from './runInfoDomManipulation';
import { LapDetails } from '../models/lapDetials';

const map = new MapUtility();
let coords: {latitude: number, longitude:number};

function resetLaps() {
  map.removeLayers();
  map.addMap(coords);
  clearCheckBoxes()
}

function startLaps() {
  startSpinner();
  try {
    const lapArray = getCheckedLaps();
    const lapDetailArray: LapDetails[] = [];

    finalResult$.subscribe((res) => {
      lapDetailArray.push(res.responseJson);
      map.addMarkersToTrack(lapDetailArray, lapArray);
      stopSpinner();
    });

    lapFetchRequest$.next(lapArray);
  } catch (error) {
    console.error(error);
  }
}

try {
  const runInfoStorage = localStorage.getItem('runDetails');

  if (!runInfoStorage) {
    window.location.assign('./runs.html');
  } else {
    const runInfo: KartRun = JSON.parse(runInfoStorage);

    getCoordinatesSubject$.subscribe((coordinates) => {
      addHeaderInfo(runInfo, resetLaps);
      coords = coordinates;
      map.addMap(coordinates);
      addLapInfo(runInfo.lapSummaries, startLaps);
      stopSpinner();
    });

    newFetchRequest$.next(null);
  }
} catch (error) {
  console.error(error);
}
