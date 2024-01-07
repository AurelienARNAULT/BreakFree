import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

type ListContextType = {
    objectInPoche: string[];
    addObjectInPoche: (object: string) => void;
    removeObjectAtIndex: (index: number) => void;
    enigmeResolved: string[];
    addEnigmeResolved: (enigme: string) => void;
    removeEnigmeResolved: (enigme: string) => void;
};

const ListContext = createContext<ListContextType>({
    objectInPoche: [],
    addObjectInPoche: () => {},
    removeObjectAtIndex: () => {},
    enigmeResolved: [],
    addEnigmeResolved: () => {},
    removeEnigmeResolved: () => {}
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
            return newState;
        });
    }, []);

    const removeObjectAtIndex = useCallback((index: number) => {
        console.log(`Suppression de l'objet dans la poche à l'index ${index}`);
        setObjectInPoche(prevState => [
            ...prevState.slice(0, index),
            ...prevState.slice(index + 1)
        ]);
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
