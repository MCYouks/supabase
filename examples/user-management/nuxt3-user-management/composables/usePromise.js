import { useEventHook } from "@/composables/useEventHook.js";
import { ref } from "vue";

export const usePromise = function (func, defaultValue = null) {
  // States
  const result = ref(defaultValue);
  const loading = ref(false);
  const error = ref(null);

  // States (hooks)
  const doneHook = useEventHook();
  const errorHook = useEventHook();

  // Reactive Promise
  const promise = async (...args) => {
    loading.value = true;
    error.value = null;
    // result.value = defaultValue;


    try {
      console.log({ args, func })
      result.value = await func(...args);
      doneHook.trigger(result.value);
    } catch (err) {
      if (err) console.log(err);
      error.value = err;
      errorHook.trigger(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    // States
    result,
    loading,
    error,

    // Reactive Promise
    promise,

    // Event Hooks
    onDone: doneHook.on,
    onError: errorHook.on
  };
};