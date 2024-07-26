import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface TextareaContextType {
  textareaValue: string;
  setTextareaValue: (value: string) => void;
}

const TextareaContext = createContext<TextareaContextType | undefined>(
  undefined
);

export const TextareaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [textareaValue, setTextareaValue] = useState<string>('');

  const contextValues = useMemo(() => {
    return {
      textareaValue,
      setTextareaValue,
    };
  }, [textareaValue, setTextareaValue]);

  return (
    <TextareaContext.Provider value={contextValues}>
      {children}
    </TextareaContext.Provider>
  );
};

export const useTextareaContext = () => {
  const context = useContext(TextareaContext);
  if (context === undefined) {
    throw new Error('useTextareaContext must be used inside TextareaProvider');
  }
  return context;
};
