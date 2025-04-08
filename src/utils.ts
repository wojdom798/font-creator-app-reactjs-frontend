export const convertByteToHexString = (byte: number): string =>
{
  if (byte < 0)
  {
    byte = 0;
  }

  const hexStr = (byte & 0xFF).toString(16).toUpperCase();

  if (byte < 16)
  {
    return "0x0" + hexStr;
  }
  return "0x" + hexStr
};


export const charArrayToString = (charArray: number[]): string =>
{
  let retStr = "{ ";
  let i: number;

  for (i = 0; i < charArray.length - 1; i++)
  {
    retStr += convertByteToHexString(charArray[i]) + ", ";
  }
  retStr += convertByteToHexString(charArray[i]) + " };";

  return retStr;
};