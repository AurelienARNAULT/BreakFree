import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";
import Sound from "react-native-sound";
import { Vibration } from 'react-native';

type ListContextType = {
  objectInPoche: string[];
  addObjectInPoche: (object: string) => void;
  removeObjectAtIndex: (index: number) => void;
  enigmeResolved: string[];
  addEnigmeResolved: (enigme: string) => void;
  removeEnigmeResolved: (enigme: string) => void;
};

Sound.setCategory("Playback");

const ListContext = createContext<ListContextType>({
  objectInPoche: [],
  addObjectInPoche: () => {
  },
  removeObjectAtIndex: () => {
  },
  enigmeResolved: [],
  addEnigmeResolved: () => {
  },
  removeEnigmeResolved: () => {
  }
});

type ListProviderProps = {
  children: ReactNode;
};

export const ListProvider = ({ children }: ListProviderProps) => {
  const [objectInPoche, setObjectInPoche] = useState<string[]>([]);
  const [enigmeResolved, setEnigmeResolved] = useState<string[]>([]);

  const addObjectInPoche = useCallback((object: string) => {
    console.log(`Ajout de l'objet dans la poche: ${object}`);
    setObjectInPoche(prevState => {
      console.log("État précédent de objectInPoche:", prevState);
      const newState = [...prevState, object];
      console.log("Nouvel état de objectInPoche:", newState);
      Vibration.vibrate(1000);
      var mySound = new Sound("bell.wav", Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log("Erreur de chargement du son", error);
          return;
        }
        // Jouer le son
        mySound.play((success) => {
          if (!success) {
            console.log("Erreur de lecture du son");
          }
        });
      });
      return newState;
    });
  }, []);

  const removeObjectAtIndex = useCallback((index: number) => {
    console.log(`Suppression de l'objet dans la poche à l'index ${index}`);
    setObjectInPoche(prevState => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1)
    ]);
    var mySound = new Sound("swoosh.wav", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Erreur de chargement du son", error);
        return;
      }
      // Jouer le son
      mySound.play((success) => {
        if (!success) {
          console.log("Erreur de lecture du son");
        }
      });
    });

  }, []);

  const addEnigmeResolved = useCallback((enigme: string) => {
    setEnigmeResolved(prevState => [...prevState, enigme]);
  }, []);

  const removeEnigmeResolved = useCallback((enigme: string) => {
    setEnigmeResolved(prevState => prevState.filter(item => item !== enigme));
  }, []);

  const contextValue = useMemo(() => ({
    objectInPoche,
    addObjectInPoche,
    removeObjectAtIndex,
    enigmeResolved,
    addEnigmeResolved,
    removeEnigmeResolved
  }), [objectInPoche, enigmeResolved]);

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);
