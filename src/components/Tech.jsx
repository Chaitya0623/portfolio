import React from "react";

import BallCanvas from "./canvas/Ball";
import SectionWrapper from "../hoc/SectionWrapper";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-5 hide'>
      {technologies.map((technology) => (
        <div className='w-20 h-20' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");