import { Outlet } from "react-router-dom";
import Container from "../Container";
const Layout = () => {
  return (
    <div className="h-full w-full bg-gray-950 font-montserrat text-white">
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;