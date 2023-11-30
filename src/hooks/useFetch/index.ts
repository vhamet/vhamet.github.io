import useAsync from "../useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const useFetch = <T>(
  url: string,
  options = {},
  dependencies: unknown[] = []
) => {
  return useAsync<T>(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
};

export default useFetch;
