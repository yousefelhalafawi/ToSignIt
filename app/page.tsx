import MainContent from "./_components/home/MainContent";
import CustomNavbar from "./_components/layout/Navbar";
import ClientComponents from "./Client";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      {/* <NewsSlider /> */}
      <MainContent />
      <ClientComponents />
    </>
  );
}
