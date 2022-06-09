import { useEffect, useState } from "react";
import Data from "./data.json";
import Text from "./components/Text";
import Date from "./components/Date";
import Command from "./components/Command";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [view, setView] = useState(null);
  const [data, setData] = useState(null);
  const [formKeys, setFormKeys] = useState([]);

  useEffect(() => {
    const { view, data } = Data;
    setView(view);
    setData(data);
    setFormKeys(Object.keys(view));
  }, []);

  const selectComponent = (type, props) => {
    const { label, path, text, value } = props;
    const sx = { m: 2, width: 300 };
    switch (type) {
      case "Text":
        return <Text sx={sx} label={label} name={path} value={value} />;
      case "Date":
        return <Date sx={sx} label={label} name={path} value={value} />;
      case "Command":
        return <Command sx={sx} label={label} text={text} />;
      default:
        return <div>Invalid Component</div>;
    }
  };

  return (
    <div>
      {[...Array(formKeys.length)].map((_, formIndex) => {
        const formKey = formKeys[formIndex];
        const componentKeys = Object.keys(view[formKey].children);
        return (
          <Box key={formIndex} component="form">
            <Typography variant="h5" m={2}>
              {view[formKey].title}
            </Typography>
            {[...Array(componentKeys.length)].map((_, componentIndex) => {
              const componentKey = componentKeys[componentIndex];
              const { component, label, path, text } =
                view[formKey].children[componentKey];
              const formData = data[formKey];
              return (
                <div key={componentIndex}>
                  {selectComponent(component, {
                    label,
                    path,
                    text,
                    value: formData[path],
                  })}
                </div>
              );
            })}
          </Box>
        );
      })}
    </div>
  );
};

export default App;
