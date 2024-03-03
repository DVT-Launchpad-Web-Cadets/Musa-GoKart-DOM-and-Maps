import { KartRun } from '../models/KartRun';
import { allRunsSubject$, newFetchRequest$ } from '../api/apiCalls';
import { addRunsToDom, stopSpinner } from './runsDomManipulation';

allRunsSubject$.subscribe((res: KartRun) => {
  try {
    addRunsToDom(res);
    localStorage.setItem('runDetails', JSON.stringify(res));
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
});

newFetchRequest$.next(null);
