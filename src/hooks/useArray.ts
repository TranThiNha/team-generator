import { useMemo } from 'react';
import { TeamName } from '../types';

function useArrays(n: number): Array<TeamName> {
  return useMemo(() => {
    const a: TeamName[] = [];
    for (let i = 1; i < n + 1; i++) {
      a.push({
        key: i,
        name: '',
      });
    }
    return a;
  }, [n]);
}

export default useArrays;
