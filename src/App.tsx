import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@fintrack/store";
import { router } from "@fintrack/routes";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};

export default App;
