import { TextField } from "@mui/material";
import { motion } from "framer-motion";

const SoupOptions: React.FC<{ register: any }> = ({ register }) => {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
      <TextField
        {...register("spiciness_scale", {
          required: true,
          shouldUnregister: true,
          minValue: 1,
          maxValue: 10,
        })}
        required
        type="number"
        variant="outlined"
        aria-label="spiciness_scale"
        placeholder="Spiciness scale"
      />
    </motion.div>
  );
};

export default SoupOptions;
