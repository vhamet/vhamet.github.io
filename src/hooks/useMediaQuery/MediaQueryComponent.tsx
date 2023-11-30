import useMediaQuery from ".";

const MediaQueryComponent = () => {
  const isLarge = useMediaQuery("(min-width: 200px)");

  return <div>Large: {isLarge.toString()}</div>;
};

export default MediaQueryComponent;
