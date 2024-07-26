import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { resultExceptions, TreeResult } from '../components/Tree/types';

interface ResultContextType {
  result: TreeResult;
  setResult: (value: TreeResult) => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [result, setResult] = useState<TreeResult>(
    resultExceptions.EMPTY_TREE_AND_TEXTAREA
  );

  const contextValues = useMemo(() => {
    return {
      result,
      setResult,
    };
  }, [result]);

  return (
    <ResultContext.Provider value={contextValues}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error('useResultContext must be used inside ResultProvider');
  }
  return context;
};
