import { createContext, useContext, useState } from "react";

export const AnswersContext = createContext({});

export function AnswersProvider({ children }) {
   const [answers, setAnswers] = useState({});
   return (
      <AnswersContext.Provider value={{ answers, setAnswers }}>{children}</AnswersContext.Provider>
   );
}

export function useAnswers() {
   const context = useContext(AnswersContext);
   if (!context) {
      throw new Error("useAnswers must be used within the AnswersProvider");
   }
   return context;
}