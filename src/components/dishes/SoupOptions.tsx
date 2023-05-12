import React from "react";
import { TextField } from "@mui/material";

const SoupOptions: React.FC<{ register: any }> = ({ register }) => {
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default SoupOptions;
