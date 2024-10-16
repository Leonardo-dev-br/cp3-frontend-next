import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserContextType {
  userName: string | null;
  cityCode: number | null;
  setUserName: (name: string | null) => void;
  setCityCode: (code: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [cityCode, setCityCode] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userName, cityCode, setUserName, setCityCode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext deve ser usado com UserProvider");
  }
  return context;
};

export const useVerifyLogin = () => {
  const { userName } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.push("/login");
    }
  }, [userName, router]);
};
