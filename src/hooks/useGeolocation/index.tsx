import { useState, useEffect } from "react";

const useGeolocation = (options?: PositionOptions) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null>();
  const [data, setData] = useState({} as GeolocationCoordinates);

  useEffect(() => {
    const successHandler = (position: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData(position.coords);
    };
    const errorHandler = (error: GeolocationPositionError) => {
      setError(error);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
};

export default useGeolocation;
