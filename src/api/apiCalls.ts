import API_BASE_URL from './apiBaseURL';
import { KartRun } from '../models/KartRun';
import { LapDetails } from '../models/lapDetials';
import {
  Subject,
  switchMap,
  map,
  catchError,
  EMPTY,
  from,
  mergeMap,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

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

export const getCoordinatesSubject$ = newFetchRequest$.pipe(
  switchMap(() =>
    fromFetch(`${API_BASE_URL}/runs`).pipe(
      switchMap((res) =>
        fromPromise(res.json()).pipe(
          switchMap((fileName) =>
            fromFetch(`${API_BASE_URL}/runs/${fileName}/laps/${1}`).pipe(
              switchMap((res) => fromPromise(res.json())),
              map((responseJson: LapDetails) => ({
                latitude: responseJson.dataSet[0]['Lat.'],
                longitude: responseJson.dataSet[0]['Lon.'],
              })),
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
    ),
  ),
  catchError((error) => {
    console.error(error);
    return EMPTY;
  }),
);

export const lapFetchRequest$ = new Subject<number[]>();

export const lapMataData$ = lapFetchRequest$.pipe(
  switchMap((laps) =>
    from(laps).pipe(
      mergeMap((lap) =>
        fromFetch(`${API_BASE_URL}/runs`).pipe(
          switchMap((res) =>
            fromPromise(res.json()).pipe(
              switchMap((fileName) =>
                fromFetch(`${API_BASE_URL}/runs/${fileName}/laps/${lap}`).pipe(
                  switchMap((res) => fromPromise(res.json())),
                  map((responseJson: LapDetails) => ({
                    responseJson,
                  })),
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
        ),
      ),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      }),
    ),
  ),
);
