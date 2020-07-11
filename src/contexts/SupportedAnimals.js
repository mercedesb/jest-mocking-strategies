import React, { createContext } from "react";

const supportedAnimals = ["dog", "cat", "fox", "goat"];

export const SupportedAnimals = createContext({
  animals: null,
});

export function SupportedAnimalsContextProvider({ children }) {
  return (
    <SupportedAnimals.Provider value={{ animals: supportedAnimals }}>
      {children}
    </SupportedAnimals.Provider>
  );
}
