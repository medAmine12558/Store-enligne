import { useEffect, useState } from "react";

const useDiscount = ({ prix, reduction = 0 }) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (reduction === 0) {
      setResult(prix);
    } else {
      setResult(prix - (prix * reduction) / 100);
    }
  }, [prix, reduction]);

  return result;
};

export default useDiscount;