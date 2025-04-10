export const safeRequest = async <T>(promise: Promise<T>): Promise<{ data: T | null; error: unknown }> => {
  try {
    const response = await promise;
    return { data: response, error: null };
  } catch (error) {
    return { data: null, error };
  }
};