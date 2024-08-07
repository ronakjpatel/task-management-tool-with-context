//Accepts the existing state array and syncs with the localstorage array
export function updateLocalStorageArray(currentArray, type) {
  const tempArr = [];
  console.log("got curr array, ", currentArray);

  currentArray.map((item) => tempArr.push(item));
  localStorage.setItem(type, JSON.stringify(tempArr));
}

export function generateId(type) {
  return type + "id" + Math.random().toString(16).slice(2);
}

//This function is responsible for finding the uid of the logging in user
export function findUserId(users, email, password) {
  if (!users || users.length === 0) {
    return false;
  }

  const result = users.find(
    (eachUser) => eachUser.email === email && eachUser.password === password
  );

  if (result) {
    return result.uid;
  } else {
    return false;
  }
}
