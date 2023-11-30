import SyncLoader from "react-spinners/SyncLoader";

type LoaderProps = {
  color?: string;
};

const Loader = ({ color }: LoaderProps) => (
  <SyncLoader color={color || "#13a5af"} />
);

export default Loader;
