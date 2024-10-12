/* eslint-disable react/prop-types */
import useDiscount from "../hooks/useDiscount";


const PriceSection = ({ prix, reduction = 0 }) => {
  const result = useDiscount({ prix: prix, reduction: reduction });
  const reductionVal = parseFloat(reduction.toString());

  if (Math.floor(reductionVal) === 0) {
    return <h2 className="font-medium text-amber-800 text-xl">${prix}</h2>;
  }

  return (
    <div className="leading-3 w-full flex px-2">
      <p className="grow font-medium text-red-600 text-xl text-center w-1/3">
        ${result.toFixed(2)}
      </p>
      <p className="flex-none w-1/4 mr-2 text-sm line-through opacity-70 dark:text-white text-amber-600 py-1 pr-0">
        ${prix}
      </p>
      <p className="flex-none w-1/4 text-sm font-semibold text-amber-950 pr-0 py-1 ">
        -{reductionVal}%
      </p>
    </div>
  );
};

export default PriceSection;