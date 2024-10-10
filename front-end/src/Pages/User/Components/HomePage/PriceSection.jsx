import useDiscount from "../hooks/useDiscount";
import React from 'react';

const PriceSection = ({ prix, reduction = 0 }) => {
  const result = useDiscount({ prix: prix, reduction: reduction });
  const reductionVal = parseFloat(reduction.toString());

  if (Math.floor(reductionVal) === 0) {
    return <h2 className="font-medium text-amber-800 text-xl">${prix}</h2>;
  }

  return (
    <div className="leading-3 w-full ">
      <h2 className="font-medium text-red-600 text-xl text-center">
        ${result.toFixed(2)}
      </h2>
      <span className="mr-2 text-sm line-through opacity-70 dark:text-white text-amber-600 ">
        ${prix}
      </span>
      <span className="text-sm font-semibold dark:text-white ">
        -{reductionVal}%
      </span>
    </div>
  );
};

export default PriceSection;