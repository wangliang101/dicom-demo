import { createContext, Dispatch } from 'react';

const initialAppOption = {
  loadState: false,
};

type InitialAppOption = {
  loadState: Boolean;
};

type ActionType = {
  type: string;
  payload: Boolean;
};

function reducer(state: InitialAppOption, action: ActionType): InitialAppOption {
  switch (action.type) {
    case 'CHANGE_LOAD_STATE':
      return { ...state, loadState: action.payload };
    default:
      return { ...state };
  }
}

interface ContextProps {
  state: InitialAppOption;
  dispatch: Dispatch<ActionType>;
}

const APPContext = createContext({} as ContextProps);

export { reducer, initialAppOption, APPContext };
