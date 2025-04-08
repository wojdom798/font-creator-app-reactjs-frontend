import React, { useEffect, useState, SyntheticEvent } from "react";
import Char10x16 from "./Char10x16";
import Font from "./Font";


function Main()
{
  return (
    <div>
      <h1>Main Component</h1>
      {/* <Char10x16 /> */}
      <Font
        id={1}
        initialValues={null}
        onEditCharClick={(charId, charData) => {
          console.log(`char to edit: ${charId}`);
          console.log(charData);
        }}
      />
    </div>

  );
}

export default Main;