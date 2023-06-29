import MainTable from "./components/MainTable";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <MainTable />
    </ChakraProvider>
  );
}

export default App;
