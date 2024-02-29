import { drawLap } from '../map/runInfoMap';
import { KartRun } from '../models/KartRun';
import { LapDetails } from '../models/lapDetials';
import { getFileName, getAllRunsCall, getLapInfoCall } from './api_calls';
import {
  addHeaderInfo,
  addLapInfo,
  getLapNumber,
  startSpinner,
  stopSpinner,
} from './runInfoDomManipulation';

export function getAllRunsInfo(filename: string[]) {
  if (filename?.[0]) {
    getAllRunsCall(
      filename[0],
      (res: KartRun) => {
        addHeaderInfo(res, handleChange);
        getLapInfo(filename[0], 1);
      },
      (err: Error) => {
        console.error(err);
      },
      () => {
        stopSpinner();
      },
    );
  }
}

export function getLapRun(fileName: string[], lapNumber: number) {
  if (fileName?.[0]) {
    getAllRunsCall(
      fileName[0],
      (res: KartRun) => {
        addLapInfo(res.lapSummaries[lapNumber - 1]);
      },
      (err: Error) => {
        console.error(err);
      },
      () => {
        stopSpinner();
      },
    );
  }
}

export function getLapInfo(filename: string, lap: number) {
  getLapInfoCall(
    filename,
    lap,
    (res: LapDetails) => {
      if (res?.dataSet?.[0]) {
        drawLap(res.dataSet);
      }
    },
    (err: Error) => {
      console.error(err);
    },
    () => {
      stopSpinner();
    },
  );
}

export function handleChange() {
  startSpinner();
  getFileName(
    (res: string[]) => {
      getLapRun(res, getLapNumber());
      getLapInfo(res[0], getLapNumber());
    },
    (err: Error) => {
      console.error(err);
    },
  );
}

function initialisePage() {
  getFileName(
    (res: string[]) => {
      getAllRunsInfo(res);
    },
    (err: Error) => {
      console.error(err);
    },
  );
}

initialisePage();
