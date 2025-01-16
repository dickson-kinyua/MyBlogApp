// helper function to check missing input

export const missingInput = (inputs) => {
  return inputs.some((input) => !input || input.trim() === "");
};
