
export interface IPixelProps
{
  id: number;
  shouldDisplayNumber: boolean;
  // onPixelClick: (pixelState: boolean) => void;
  onPixelClick: (pxId: number, pixelState: boolean) => void;
};


export interface IFontProps
{
  id: number;
  initialValues: number[] | null;
  onEditCharClick: (charId: number, charData: number[]) => void;
};


export interface IChar10x16Props
{
  id: number;
  initialPixels: number[];
  onSaveButtonClick: (charId: number, pixelData: number[]) => void;
  onGoBackButtonClick: () => void;
};


export enum ActiveViewEnum
{
  FONT_TABLE = 1,
  CHARACTER_EDITOR,
}