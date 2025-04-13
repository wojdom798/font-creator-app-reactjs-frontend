
export interface IPixelProps
{
  id: number;
  shouldDisplayNumber: boolean;
  // onPixelClick: (pixelState: boolean) => void;
  onPixelClick: (pxId: number, pixelState: boolean) => void;
  initialValue?: boolean;
};


export interface IFontProps
{
  id: number;
  fontCharArray: number[];
  initialValues: number[] | null;
  onEditCharClick: (charId: number) => void;
  editedChar: { charId: number, charArray: number[] } | null;
  onLoadFontFromJson: (charData: number[]) => void;
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