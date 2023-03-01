import { ref } from "vue";

export const useEventHook = function () {
  // Setup array of functions
  const functions = ref([]);

  // Setup On method to add new functions to the array of functions
  const on = function (func) {
    // Inject new function into the array of functions
    functions.value = [...functions.value, func];
  };

  // Setup Trigger method to execute all functions in the array
  const trigger = function (...args) {
    // Iterate over each function in the array
    for (const func of functions.value) {
      // Execute function by passing arguments
      try {
        func(...args);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    // Methods
    on,
    trigger
  };
};
