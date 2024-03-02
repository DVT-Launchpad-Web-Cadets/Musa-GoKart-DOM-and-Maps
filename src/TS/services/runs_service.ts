import { allRunsSubject$, newFetchRequest$ } from './api_calls';
import { addRunsToDom, stopSpinner } from './runsDomManipulation';

allRunsSubject$.subscribe((res) => {
  try {
    addRunsToDom(res);
    localStorage.setItem('runDetails', JSON.stringify(res));
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
});

newFetchRequest$.next(null);
