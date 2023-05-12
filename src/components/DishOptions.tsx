import { motion, AnimatePresence } from "framer-motion";
import PizzaOptions from "./dishes/PizzaOptions";
import SoupOptions from "./dishes/SoupOptions";
import SandwichOptions from "./dishes/SandwichOptions";

const DishOptions: React.FC<{
  chosenDish: string | undefined;
  register: any;
  errors: any;
}> = ({ chosenDish, register, errors }) => {
  const chooseDish = (): JSX.Element | null => {
    switch (chosenDish) {
      case "pizza":
        return (
          <PizzaOptions key={"pizza"} register={register} errors={errors} />
        );

      case "soup":
        return <SoupOptions key={"soup"} register={register} errors={errors} />;

      case "sandwich":
        return (
          <SandwichOptions
            key={"sandwich"}
            register={register}
            errors={errors}
          />
        );

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
