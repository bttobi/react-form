import { Form } from "./components/Form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

const App: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main
        id="App"
        className="flex flex-col justify-center align-center items-center text-xl"
      >
        <Form />
      </main>
    </ThemeProvider>
  );
};

export default App;
