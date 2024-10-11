import { Outlet } from "react-router-dom";
import Container from "../Container";
const Layout = () => {
  return (
    <div className="text-back h-screen w-full overflow-x-hidden bg-white  font-montserrat">
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
