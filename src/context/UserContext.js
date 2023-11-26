import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [changeUser, setChangeUser] = useState(true);

  return (
    <DataContext.Provider
      value={{
        setChangeUser,
        changeUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
