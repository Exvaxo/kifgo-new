const useLocalStorage = () => {
  function setStorage(key: string, value: any) {
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_TOKEN_PREFIX}_${key}`,
      JSON.stringify(value)
    );
  }

  function getStorage(key: string) {
    const val =
      localStorage.getItem(`${process.env.NEXT_PUBLIC_TOKEN_PREFIX}_${key}`) ??
      null;

    if (val) {
      return JSON.parse(val);
    }
    return val;
  }

  function removeStorage(key: string) {
    localStorage.removeItem(`${process.env.NEXT_PUBLIC_TOKEN_PREFIX}_${key}`);
  }

  return { setStorage, getStorage, removeStorage };
};

export default useLocalStorage;
