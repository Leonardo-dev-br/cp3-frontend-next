import { createContext, useState, Dispatch, SetStateAction } from "react";


interface UserContextType {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;
