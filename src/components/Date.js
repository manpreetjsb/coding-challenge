import { TextField } from "@mui/material";

const Date = (props) => (
  <TextField type="date" {...props} value={props.value.split("T")[0]} />
);

export default Date;
