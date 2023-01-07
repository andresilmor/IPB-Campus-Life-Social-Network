export const updateMSG = (message) => {
    return {
      type: "UPDATE_MSG",
      payload: message,
    };
  };