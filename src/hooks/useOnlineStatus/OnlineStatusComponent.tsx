import useOnlineStatus from ".";

const OnlineStatusComponent = () => {
  const online = useOnlineStatus();

  return <div>{online.toString()}</div>;
};

export default OnlineStatusComponent;
