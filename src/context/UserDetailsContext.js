import { createContext, useContext, useState } from "react";

export const UserDetailsContext = createContext({});

export function UserDetailsProvider({ children }) {
   const [userData, setUserData] = useState({});

   return (
      <UserDetailsContext.Provider value={{ userData, setUserData }}>{children}</UserDetailsContext.Provider>
   );
}

export function useUserDetails() {
   const context = useContext(UserDetailsContext);
   if (!context) {
      throw new Error("useUserDetails must be used within the UserDetailsProvider");
   }
   return context;
}