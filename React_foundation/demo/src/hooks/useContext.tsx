import { createContext, useContext } from 'react';

export const MyContext = createContext({ name: '' });

export const useMyContext = () => useContext(MyContext);
