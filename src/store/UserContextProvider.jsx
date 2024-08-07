import React, { createContext, useEffect, useState } from "react";
import { generateId, updateLocalStorageArray } from "../utils/utilFunctions";

export const UserContext = createContext("");

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Users have been modified, ", users);
  }, [users]);

  function initialUserLoad() {
    console.log("Initial User Load is executed ");
    const tempArr = localStorage.getItem("users");

    if (tempArr) {
      //this check is neccessary because in case if local state is already upto date (>0 elements)
      // that means the local storage is already in sync to no need to do anything.
      if (users.length === 0) {
        const newUserArr = JSON.parse(JSON.stringify(users));
        const parsedArr = JSON.parse(tempArr);

        parsedArr.map((each) => newUserArr.push(each));

        setUsers(newUserArr);
      }
    }
  }

  function registerUserAccount(payload) {
    const newUsersArr = JSON.parse(JSON.stringify(users));
    const uData = payload;
    uData.uid = generateId("u");

    newUsersArr.push(uData);

    setUsers(newUsersArr);
    updateLocalStorageArray(newUsersArr, "users");
  }

  return (
    <UserContext.Provider
      value={{ users, registerUserAccount, initialUserLoad }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
