import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  RefObject,
} from 'react';

interface TextareaRefContextType {
  textareaRef: RefObject<HTMLTextAreaElement>;
  setTextareaValue: (value: string) => void;
}

const TextareaRefContext = createContext<TextareaRefContextType | undefined>(
  undefined
);

export const TextareaRefProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setTextareaValue = (value: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  };

  const contextValue = { textareaRef, setTextareaValue };

  return (
    <TextareaRefContext.Provider value={contextValue}>
      {children}
    </TextareaRefContext.Provider>
  );
};

export const useTextareaRefContext = () => {
  const context = useContext(TextareaRefContext);
  if (context === undefined) {
    throw new Error(
      'useTextareaRefContext must be used within a TextareaRefProvider'
    );
  }
  return context;
};
