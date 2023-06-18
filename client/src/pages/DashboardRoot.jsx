import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const DashboardRoot = () => {
  const [anmHeartBeat, setAnmHeartBeat] = useState(null);

  useEffect((_) => {
    import(`../assets/heart-beat-loading.json`).then((response) =>
      setAnmHeartBeat(response.default)
    );
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      {anmHeartBeat ? (
        <Lottie className="w-full" animationData={anmHeartBeat} loop={true} />
      ) : null}
    </div>
  );
};

export default DashboardRoot;
