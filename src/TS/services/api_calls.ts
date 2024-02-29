import API_BASE_URL from '../api/api_Base_Url';
import { KartRun } from '../models/KartRun';
import { LapDetails } from '../models/lapDetials';
import { Subject, switchMap, map, catchError, EMPTY } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

export function getFileName(
  callBack: (s: string[]) => void,
  errorCallBack: (e: Error) => void,
) {
  fetch(`${API_BASE_URL}/runs`)
    .then((response) => response.json())
    .then((responseJson: string[]) => {
      callBack(responseJson);
    })
    .catch((err) => errorCallBack(err));
}

export function getAllRunsCall(
  filename: string,
  callBack: (run: KartRun) => void,
  errorCallBack: (e: Error) => void,
  finallyCallBack: () => void,
) {
  fetch(`${API_BASE_URL}/runs/${filename}`)
    .then((response) => response.json())
    .then((responseJson: KartRun) => {
      callBack(responseJson);
    })
    .catch((err) => errorCallBack(err))
    .finally(() => {
      finallyCallBack();
    });
}

export function getLapInfoCall(
  filename: string,
  lap: number,
  callBack: (run: LapDetails) => void,
  errorCallBack: (e: Error) => void,
  finallyCallBack: () => void,
) {
  fetch(`${API_BASE_URL}/runs/${filename}/laps/${lap}`)
    .then((response) => response.json())
    .then((responseJson: LapDetails) => {
      callBack(responseJson);
    })
    .catch((err) => errorCallBack(err))
    .finally(() => {
      finallyCallBack();
    });
}

// rxjs

export const newFetchRequest$ = new Subject<null>();

export const allRunsSubject$ = newFetchRequest$.pipe(
  switchMap(() =>
    fromFetch(`${API_BASE_URL}/runs`).pipe(
      switchMap((res) =>
        fromPromise(res.json()).pipe(
          switchMap((filename: string) =>
            fromFetch(`${API_BASE_URL}/runs/${filename}`).pipe(
              switchMap((res) => fromPromise(res.json())),
              map((run: KartRun) => run),
              catchError((error) => {
                console.error(error);
                return EMPTY;
              }),
            ),
          ),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          }),
        ),
      ),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      }),
    ),
  ),
  catchError((error) => {
    console.error(error);
    return EMPTY;
  }),
);
