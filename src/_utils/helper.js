export function createReducer(initialState: Object, handlers: Object) {
  return (state: Object = initialState, action: Object) => {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export function actionGenerator(key) {
  return {
    ACTION: key,
    SUCCESS: `${key}_SUCCESS`,
    FAILED: `${key}_FAILED`
  };
}
