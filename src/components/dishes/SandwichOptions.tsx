import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const SandwichOptions: React.FC<{ register: any }> = ({ register }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <TextField
          {...register("slices_of_bread", {
            required: true,
            shouldUnregister: true,
          })}
          required
          type="number"
          variant="outlined"
          aria-label="slices_of_bread"
          placeholder="Slices of bread"
          className="overflow-hidden"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SandwichOptions;
