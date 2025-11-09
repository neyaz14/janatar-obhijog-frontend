import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Sun, Moon, User, LogIn, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../Provider/authProvider";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Auth context
  const { user, signOut, loading } = useContext(AuthContext);

  // Translation related logic
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsLanguageDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    signOut();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <motion.nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800"
        : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
        }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex-shrink-0">
                <img
                  src="/logoTransparent.png"
                  alt="জনতার অভিযোগ"
                  className="h-14 w-14 object-contain"
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                  জনতার অভিযোগ
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide transition-colors">
                  Digital Complaint Box
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative dropdown-container">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage === "en" ? "English" : "বাংলা"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === "en"
                        ? "bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("bn")}
                      className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === "bn"
                        ? "bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      বাংলা
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

            {/* Authentication Section */}
            {user ? (
              // Logged in user section
              <div className="relative dropdown-container">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user.firstName} {user.lastName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Not logged in section
              <>
                <Link to="/signin">
                  <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <LogIn className="h-4 w-4" />
                    <span>{t('login')}</span>
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 rounded-md shadow-sm hover:bg-red-700 dark:hover:bg-red-600 transition-colors">
                    {t('getStarted')}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleLanguageDropdown}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Globe className="h-5 w-5" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Language dropdown for mobile */}
      <AnimatePresence>
        {isLanguageDropdownOpen && (
          <motion.div
            className="lg:hidden border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 px-4 py-3"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex space-x-3">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${currentLanguage === "en"
                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("bn")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${currentLanguage === "bn"
                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                বাংলা
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 py-4 space-y-4">
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  // Mobile logged in user section
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  // Mobile not logged in section
                  <>
                    <Link
                      to="/signin"
                      className="block mb-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <LogIn className="h-4 w-4" />
                        <span>{t('login')}</span>
                      </button>
                    </Link>
                    <Link
                      to="/signup"
                      className="block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-2 text-white bg-red-600 dark:bg-red-500 rounded-md shadow-sm hover:bg-red-700 dark:hover:bg-red-600 transition-colors">
                        {t('getStarted')}
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;