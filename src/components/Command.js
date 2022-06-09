import { Button } from "@mui/material";

const Command = (props) => (
  <Button variant="contained" type="submit" {...props}>
    {props.text}
  </Button>
);
export default Command;
