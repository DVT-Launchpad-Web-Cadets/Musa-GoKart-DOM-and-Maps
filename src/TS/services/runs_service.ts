import {
  allRunsSubject$,
  newFetchRequest$,
} from './api_calls';
import { addRunsToDom, stopSpinner } from './runsDomManipulation';


allRunsSubject$.subscribe((res) => {
  addRunsToDom(res);
  stopSpinner();
});

newFetchRequest$.next(null);
