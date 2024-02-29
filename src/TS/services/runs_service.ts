import { KartRun } from '../models/KartRun';
import { getAllRunsCall, getFileName } from './api_calls';
import { addRunsToDom, stopSpinner } from './runsDomManipulation';

getFileName(
  (res: string[]) => {
    getAllRuns(res);
  },
  (err: Error) => {
    console.error(err);
  },
);

function getAllRuns(filename: string[]) {
  if (filename?.[0]) {
    getAllRunsCall(
      filename[0],
      (res: KartRun) => {
        addRunsToDom(res);
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
