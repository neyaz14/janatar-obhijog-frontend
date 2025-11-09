import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/authProvider";

const Main = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update document language attribute when language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
