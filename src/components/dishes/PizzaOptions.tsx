import { useState } from "react";
import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const PizzaOptions: React.FC<{ register: any }> = ({ register }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <AnimatePresence>
      <motion.div
        className="pizza-options grid gap-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <TextField
          {...register("no_of_slices", {
            required: true,
            shouldUnregister: true,
          })}
          required
          type="number"
          variant="outlined"
          aria-label="no_of_slices"
          placeholder="Number of slices"
        />
        <TextField
          {...register("diameter", {
            required: true,
            shouldUnregister: true,
          })}
          required
          type="number"
          variant="outlined"
          aria-label="diameter"
          placeholder="Diameter of the pizza"
          step="any"
          className="overflow-hidden"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PizzaOptions;
