import React, { createContext, useReducer, useEffect } from 'react';
import { getAccessToken, getUser } from '../utils/authUtils';

interface User {
  email: string;
  _id: string;
  role: string;
  profilePicture?: string;
  firstName: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

type Action =
  | { type: 'LOGIN'; payload: { user: User; accessToken: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_PICTURE'; payload: string };

const initialState: UserState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const savedUser = getUser();
const savedToken = getAccessToken();
if (savedUser && savedToken) {
  initialState.isAuthenticated = true;
  initialState.user = savedUser;
  initialState.accessToken = savedToken;
}

const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
      };
    case 'UPDATE_PROFILE_PICTURE':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            profilePicture: action.payload,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

const UserContext = createContext<
  { state: UserState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.user && state.accessToken) {
      localStorage.setItem('DNuser', JSON.stringify(state.user));
      localStorage.setItem('DNat', state.accessToken);
    }
  }, [state.user, state.accessToken]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
