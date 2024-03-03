import { KartRun } from '../models/KartRun';
import { allRunsSubject$, newFetchRequest$ } from '../api/apiCalls';
import { addRunsToDom, stopSpinner } from './runsDomManipulation';
console.log
allRunsSubject$.subscribe((res: KartRun) => {
  try {
    console.log(res)
    addRunsToDom(res);
    localStorage.setItem('runDetails', JSON.stringify(res));
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
});

newFetchRequest$.next(null);
