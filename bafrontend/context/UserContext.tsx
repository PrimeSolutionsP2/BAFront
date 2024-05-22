import { Dispatch, SetStateAction, createContext, useState } from "react";
import { User } from "utils/login/user.service";

interface UserContextType {
    user: User ;
    setUser: Dispatch<SetStateAction<User>>;
  }
  
  // Provide an initial value
  const initialContextValue: UserContextType = {
    user : {id:"",name:"",mail:"",role:0},
    setUser: () => {},
  };
  
  export const UserContext = createContext<UserContextType>(initialContextValue);
  
  export const UserProvider = ({children}: any) => {
      
      const [user, setUser] = useState<User>({id: "0", name: "",last_name:"",phone_number:"", mail: "", role: 0});
  
      return (
          <UserContext.Provider value={{user, setUser}}>
              {children}
          </UserContext.Provider>
      );
  }