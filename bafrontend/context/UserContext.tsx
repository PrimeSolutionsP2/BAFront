import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserData } from "app/asociados/page";

interface UserContextType {
    user: UserData | null;
    setUser: Dispatch<SetStateAction<UserData | null>>;
  }
  
  // Provide an initial value
  const initialContextValue: UserContextType = {
    user: null,
    setUser: () => {},
  };
  
  export const UserContext = createContext<UserContextType>(initialContextValue);
  
  export const UserProvider = ({children}: any) => {
      
      const [user, setUser] = useState<UserData | null>({id: 0, name: "", mail: "", type: 0});
  
      return (
          <UserContext.Provider value={{user, setUser}}>
              {children}
          </UserContext.Provider>
      );
  }