import useAsync from ".";

const AsyncComponent = () => {
  const { loading, error, value } = useAsync<string>(() => {
    return new Promise((resolve, reject) => {
      const success = false;
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error");
      }, 1000);
    });
  });

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  );
};

export default AsyncComponent;
