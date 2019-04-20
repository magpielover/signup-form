import { ActionTypes } from "../actionTypes";
import { GenerateFakeUsers } from "../../helpers/GenerateFakeUsers";
const initialState = {
  participants: GenerateFakeUsers(20),
  order: "asc",
  activeField: ""
};
const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SORT:
      let order = state.order === "asc" ? "desc" : "asc";
      state = {
        ...state,
        participants: handleSort(action.payload, order, state.participants),
        order: order,
        activeField: action.payload
      };
      break;

    case ActionTypes.DELETE_USER:
      if (!action.payload) {
        return state;
      }
      var user_id = action.payload.id;
      const result = state.participants.filter(item => item.id !== user_id);
      state = {
        ...state,
        participants: result,
        order: order
      };
      break;
    case ActionTypes.ADD_USER:
      if (!action.payload) {
        return state;
      }
      var user = action.payload;
      //is the list empty
      if (!state.participants.length) {
        user.id = 1;
      } else {
        user.id = state.participants[state.participants.length - 1].id + 1;
      }
      state = {
        ...state,
        participants: [...state.participants, user],
        order: order
      };
      break;
    case ActionTypes.EDIT_USER:
      if (!action.payload) {
        return state;
      }

      user_id = action.payload.id;
      user = action.payload;
      var tem = state.participants;
      tem.forEach(element => {
        if (element.id === user_id) {
          Object.assign(element, user);
        }
      });

      state = {
        ...state,
        participants: tem,
        order: order
      };
      break;
    default:
      return state;
  }

  return state;
};

const sortDesc = (activeField, participants) => {
  console.log("Sort desc girdi tableredcuder");
  participants.sort(function(a, b) {
    var nameA = a[activeField].toLowerCase(),
      nameB = b[activeField].toLowerCase();
    if (nameA > nameB)
      //sort string ascending
      return -1;
    if (nameA < nameB) return 1;
    return 0; //default return value (no sorting)
  });
  return participants;
};
const sortAsc = (activeField, participants) => {
  console.log("Sort asc girdi tableredcuder");
  participants.sort(function(a, b) {
    var nameA = a[activeField].toLowerCase(),
      nameB = b[activeField].toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
  return participants;
};
const handleSort = (activeField, sortType, participants) => {
  if (sortType === "asc") {
    return sortAsc(activeField, participants);
  } else {
    return sortDesc(activeField, participants);
  }
};
export default tableReducer;
