export const validateTaskName = (title) => {
  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return { isValid: false, message: "Task name cannot be empty!" };
  }
  if (trimmed.length > 100) {
    return {
      isValid: false,
      message: "Task name must be 100 characters or less!",
    };
  }

  return { isValid: true, data: trimmed };
};
