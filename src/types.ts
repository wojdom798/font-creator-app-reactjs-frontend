
export interface IPixelProps
{
  id: number;
  shouldDisplayNumber: boolean;
  // onPixelClick: (pixelState: boolean) => void;
  onPixelClick: (pxId: number, pixelState: boolean) => void;
};