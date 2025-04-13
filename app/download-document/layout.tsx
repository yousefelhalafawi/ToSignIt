import Footer from "../_components/layout/Footer";
import CustomNavbar from "../_components/layout/Navbar";

function layout({ children }: any) {
  return (
    <>
      <CustomNavbar />
      {children}
      <Footer />
    </>
  );
}

export default layout;
