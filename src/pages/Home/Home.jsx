import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">

        <main className="container mx-auto p-8 pt-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 tracking-tight">
            {t("home.title")}
            <br />
            <span className="text-green-600 dark:text-green-400">{t("home.subtitle")}</span>
          </h1>
          <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("home.description")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg transition-colors">
              {t("home.reportIssue")}
            </button>
            <button className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 transition-colors">
              {t("home.learnMore")}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
