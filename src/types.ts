
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