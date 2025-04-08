import React, { useEffect, useState, SyntheticEvent } from "react";
import { ActiveViewEnum } from "./types";
import Char10x16 from "./Char10x16";
import Font from "./Font";


function Main()
{
  const [activeView, setActiveView] = useState<ActiveViewEnum>(ActiveViewEnum.FONT_TABLE);
  const [charToEditId, setCharToEditId] = useState<number>(0);
  const [charToEditPixelData, setCharToEditPixelData] = useState<number[]>([]);


  const handleEditCharClick = (charId: number, charData: number[]) =>
  {
    setCharToEditId(charId);
    setCharToEditPixelData(charData);
    setActiveView(ActiveViewEnum.CHARACTER_EDITOR);
  }

  const renderActiveView = (view: ActiveViewEnum) =>
  {
    if (view === ActiveViewEnum.FONT_TABLE)
    {
      return (
        <Font
          id={1}
          initialValues={null}
          // onEditCharClick={(charId, charData) => {
          //   console.log(`char to edit: ${charId}`);
          //   console.log(charData);
          // }}
          onEditCharClick={handleEditCharClick}
        />
      );
    }
    else if (view === ActiveViewEnum.CHARACTER_EDITOR)
    {
      return (
        <Char10x16
          id={charToEditId}
          initialPixels={charToEditPixelData}
          onSaveButtonClick={() => console.log("save char button click")}
          onGoBackButtonClick={() => setActiveView(ActiveViewEnum.FONT_TABLE)}
        />
      );
    }
    else
    {
      return (<p>ERROR - selected view was not recognized</p>);
    }
  };

  return (
    <div>
      <h1>Main Component</h1>
      {renderActiveView(activeView)}
    </div>

  );
}

export default Main;