import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserData } from "app/asociados/page";

interface UserContextType {
    user: UserData ;
    setUser: Dispatch<SetStateAction<UserData>>;
  }
  
  // Provide an initial value
  const initialContextValue: UserContextType = {
    user : {id:"",name:"",mail:"",role:0},
    setUser: () => {},
  };
  
  export const UserContext = createContext<UserContextType>(initialContextValue);
  
  export const UserProvider = ({children}: any) => {
      
      const [user, setUser] = useState<UserData>({id: "0", name: "", mail: "", role: 0});
  
      return (
          <UserContext.Provider value={{user, setUser}}>
              {children}
          </UserContext.Provider>
      );
  }