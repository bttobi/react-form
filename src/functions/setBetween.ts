const setBetween = (
  value: string | number,
  min: string,
  max: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  isFloat: boolean
) => {
  if (isFloat) {
    setter(value.toString());
    return;
  }
  if (
    value.toString().includes("e") ||
    value.toString().includes(".") ||
    value.toString().includes(",") ||
    value == ""
  ) {
    setter(min.toString());
    return;
  }
  if (Number(value) > Number(max)) {
    setter(max.toString());
    return;
  }
  if (Number(value) < Number(min)) {
    setter(min.toString());
    return;
  } else setter(value.toString());
};

export default setBetween;
