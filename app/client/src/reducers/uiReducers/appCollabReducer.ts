import type { ReduxAction } from "ee/constants/ReduxActionConstants";
import { ReduxActionTypes } from "ee/constants/ReduxActionConstants";
import { createReducer } from "utils/ReducerUtils";
import type { User } from "entities/AppCollab/CollabInterfaces";
import { cloneDeep } from "lodash";

const initialState: AppCollabReducerState = {
  editors: [],
  pointerData: {},
  pageEditors: [],
};

const appCollabReducer = createReducer(initialState, {
  [ReduxActionTypes.APP_COLLAB_LIST_EDITORS]: (
    state: AppCollabReducerState,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ReduxAction<any>,
  ) => {
    return { ...state, editors: action.payload.users };
  },
  [ReduxActionTypes.APP_COLLAB_RESET_EDITORS]: (
    state: AppCollabReducerState,
  ) => {
    return { ...state, editors: [] };
  },
  [ReduxActionTypes.APP_COLLAB_SET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ReduxAction<any>,
  ) => {
    return {
      ...state,
      pointerData: {
        ...state.pointerData,
        [action.payload.socketId]: action.payload,
      },
    };
  },
  [ReduxActionTypes.APP_COLLAB_UNSET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ReduxAction<any>,
  ) => {
    const clonedPointerData = cloneDeep(state.pointerData);

    delete clonedPointerData[action.payload];

    return {
      ...state,
      clonedPointerData,
    };
  },
  [ReduxActionTypes.APP_COLLAB_RESET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
  ) => {
    return {
      ...state,
      pointerData: {},
    };
  },
  [ReduxActionTypes.APP_COLLAB_SET_CONCURRENT_PAGE_EDITORS]: (
    state: AppCollabReducerState,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ReduxAction<any>,
  ) => ({
    ...state,
    pageEditors: action.payload,
  }),
});

interface PointerDataType {
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [s: string]: any;
}

export interface AppCollabReducerState {
  editors: User[];
  pointerData: PointerDataType;
  pageEditors: User[];
}

export default appCollabReducer;
