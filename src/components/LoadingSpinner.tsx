import { trefoil } from "ldrs";
import React, { useEffect } from "react";

trefoil.register();

const LoadingSpinner: React.FC = () => {
  useEffect(() => {
    trefoil.register();
  }, []);

  return (
    <l-trefoil
      size="60"
      stroke="6"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="1.4"
      color="#EF4444"
    ></l-trefoil>
  );
};

export default LoadingSpinner;
