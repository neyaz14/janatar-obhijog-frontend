import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">জ</span>
              </div>
              <h3 className="text-xl font-bold">{t("home.subtitle")}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li><a href="/submit-complaint" className="text-gray-300 hover:text-white transition-colors">{t("home.reportIssue")}</a></li>
              <li><a href="/track-complaint" className="text-gray-300 hover:text-white transition-colors">{t("footer.trackComplaint")}</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">{t("footer.citizenDashboard")}</a></li>
              <li><a href="/authority-login" className="text-gray-300 hover:text-white transition-colors">{t("footer.authorityLogin")}</a></li>
              <li><a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">{t("footer.howItWorks")}</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors">{t("footer.faq")}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              <li><a href="/road-issues" className="text-gray-300 hover:text-white transition-colors">{t("footer.roadIssues")}</a></li>
              <li><a href="/electricity" className="text-gray-300 hover:text-white transition-colors">{t("footer.electricityProblems")}</a></li>
              <li><a href="/waste-management" className="text-gray-300 hover:text-white transition-colors">{t("footer.wasteManagement")}</a></li>
              <li><a href="/water-supply" className="text-gray-300 hover:text-white transition-colors">{t("footer.waterSupply")}</a></li>
              <li><a href="/government-services" className="text-gray-300 hover:text-white transition-colors">{t("footer.governmentServices")}</a></li>
              <li><a href="/anonymous-reporting" className="text-gray-300 hover:text-white transition-colors">{t("footer.anonymousReporting")}</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.contactSupport")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300 text-sm">{t("footer.email")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300 text-sm">{t("footer.phone")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 text-sm">{t("footer.location")}</span>
              </div>
            </div>
            <div className="mt-4">
              <a href="/contact" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                {t("footer.contactUs")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">25,847</div>
              <div className="text-sm text-gray-400">{t("footer.stats.totalComplaints")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">18,392</div>
              <div className="text-sm text-gray-400">{t("footer.stats.resolved")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">5,234</div>
              <div className="text-sm text-gray-400">{t("footer.stats.inProgress")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">64</div>
              <div className="text-sm text-gray-400">{t("footer.stats.departments")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              {t("footer.copyright")}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">{t("footer.privacyPolicy")}</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">{t("footer.termsOfService")}</a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">{t("footer.accessibility")}</a>
              <a href="/transparency" className="text-gray-400 hover:text-white transition-colors">{t("footer.transparencyReport")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;