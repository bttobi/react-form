import React from "react";
import { TextField } from "@mui/material";

const SandwichOptions: React.FC<{ register: any }> = ({ register }) => {
  return (
    <div className="flex flex-col gap-4">
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
      />
    </div>
  );
};

export default SandwichOptions;
