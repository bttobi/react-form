import { motion, AnimatePresence } from "framer-motion";
import PizzaOptions from "./dishes/PizzaOptions";
import SoupOptions from "./dishes/SoupOptions";
import SandwichOptions from "./dishes/SandwichOptions";

const DishOptions: React.FC<{
  chosenDish: string | undefined;
  register: any;
}> = ({ chosenDish, register }) => {
  const chooseDish = (): JSX.Element | null => {
    switch (chosenDish) {
      case "pizza":
        return <PizzaOptions key={"pizza"} register={register} />;

      case "soup":
        return <SoupOptions key={"soup"} register={register} />;

      case "sandwich":
        return <SandwichOptions key={"sandwich"} register={register} />;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="flex flex-col gap-4">{chooseDish()}</motion.div>
    </AnimatePresence>
  );
};

export default DishOptions;
