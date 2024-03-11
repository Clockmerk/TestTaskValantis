import { Outlet } from "react-router-dom";
import { Header } from "./layout/Header/header";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <Outlet />
      </main>
    </>
  );
}

export default App;
