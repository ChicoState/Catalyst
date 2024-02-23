// userUtils.js
let currentUser = null;

export const setUser = (user) => {
  currentUser = user;
};

export const getUser = () => {
  return currentUser;
};

export const clearUser = () => {
  currentUser = null;
};

export const updateUserFromQuestionnaire = (actualName, skill, time) => {
  if (currentUser) {
    currentUser.actualName = actualName;
    currentUser.skill = skill;
    currentUser.time = time;
    currentUser.takenQuestionnaire = true;
  }
};
