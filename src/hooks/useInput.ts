import { useState } from "react";

type ValidateFn = (value: string) => boolean;

interface UseInputReturn {
  value: string;
  hasError: boolean;
  isTouched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reset: (text?: string) => void;
}

export const useInput = (validateFn: ValidateFn): UseInputReturn => {
  const [value, setValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isValid = validateFn(value);
  const hasError = !isValid && isTouched;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = (text: string = "") => {
    setValue(text);
    setIsTouched(false);
  };

  return {
    value,
    hasError,
    isTouched,
    onChange,
    onBlur,
    reset,
  };
};
