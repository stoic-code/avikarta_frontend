'use client';
import { deleteSession } from '@/lib/lib';
import { createContext, ReactNode, useContext } from 'react';

interface sessionProps {
  session: any;
}

const SessionContext = createContext<sessionProps | undefined>(undefined);

export const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context?.session) {
    console.log('no contexttttt');
  }

  if (!context) {
    throw new Error('useAuth must be used inside the AuthProvider');
  }

  return context;
};
