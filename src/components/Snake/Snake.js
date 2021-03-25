import React, { useRef, useEffect, useState } from "react";

import Toolbar from "../Toolbar/Toolbar";
import Grid from "../Grid/Grid";

const Snake = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({});

  const toolbarHeight = 80;
  const score = 0;
  const lives = 3;

  useEffect(() => {
    const handleResize = () =>
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen" ref={containerRef}>
      <Toolbar height={toolbarHeight} score={score} lives={lives} />
      {dimensions.width && dimensions.height ? (
        <Grid
          width={dimensions.width}
          height={dimensions.height - toolbarHeight}
        />
      ) : null}
    </div>
  );
};

export default Snake;
