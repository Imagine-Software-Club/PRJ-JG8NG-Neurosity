// import React, { createContext, useState, useContext } from 'react';
// import auth from '@react-native-firebase/auth';

// type User = typeof auth().currentUser; 

// interface UserContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// export default UserContext;
