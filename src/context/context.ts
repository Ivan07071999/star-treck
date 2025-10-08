import { createContext } from 'react';

type SeasonUidContextType = {
  uid: string | null;
  setUid: (uid: string | null) => void;
};
export const SeasonUidContext = createContext<SeasonUidContextType | null>(null);
