const actionHandlers: { [key: string]: () => void } = {};

export const registerActionHandler = (key: string, handler: () => void) => {
  actionHandlers[key] = handler;
};

export const getActionHandler = (key: string): (() => void) | undefined => {
  return actionHandlers[key];
};

export const removeActionHandler = (key: string) => {
  delete actionHandlers[key];
};
