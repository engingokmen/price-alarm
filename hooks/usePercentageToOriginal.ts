import { addPercentageToOriginal } from "@/utilities/addPercentageToOriginal";
import { useState } from "react";

export const usePercentageToOriginal = () => {
  const [result, setResult] = useState(0);

  const updateResult = (price: number, number: number) => {
    const calculated = addPercentageToOriginal(price, number);
    setResult(calculated);
  };

  return { result, updateResult };
};
