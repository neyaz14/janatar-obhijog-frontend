import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, Shield, FileText, MapPin, Clock, Globe } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Language toggle function
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="mt-16 theme-bg-primary min-h-screen flex items-center relative overflow-hidden">
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="language-toggle"
        title={currentLanguage === 'en' ? 'Switch to Bangla' : 'ইংরেজিতে পরিবর্তন করুন'}
      >
        <Globe size={16} className="inline mr-2" />
        {currentLanguage === 'en' ? 'বাংলা' : 'English'}
      </button>

      {/* Background grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        opacity: 0.3,
      }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Text Content */}
          <motion.div className={`max-w-2xl ${currentLanguage === 'bn' ? 'lang-bn' : 'lang-en'}`} variants={fadeIn}>
            <div className="inline-flex items-center gap-2 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-8 shadow-lg">
              <Shield size={16} />
              <span>{t('home.banner.officialPlatform', 'Official Government Platform')}</span>
            </div>

            <div className="mb-8">
              <h1 className="text-5xl lg:text-6xl font-black theme-text-primary mb-4 leading-tight">
                {t('home.title', 'জনতার অভিযোগ')}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-500 leading-relaxed">
                {t('home.subtitle', 'Digital Complaint Box')}
              </h2>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-500 mb-10 leading-relaxed max-w-xl">
              {t('home.description', 'Your voice drives change. Report civic issues, track resolutions in real-time, and contribute to community development through our secure government platform.')}
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-600 dark:bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.features.easyReporting', 'Easy Reporting')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('home.features.easyReportingDesc', 'File complaints in minutes')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-600 dark:bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.features.tracking', 'Real-time Tracking')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('home.features.trackingDesc', 'Monitor resolution progress')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-600 dark:bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.features.officialResponse', 'Official Response')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('home.features.officialResponseDesc', 'Government-guaranteed action')}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to={'/dashboard/myComplaints'}>
                <motion.button
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('home.reportIssue', 'Report an Issue')}
                  <ArrowRight size={18} />
                </motion.button>
              </Link>

              <motion.button
                className="px-8 py-4 border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('home.learnMore', 'How It Works')}
              </motion.button>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div className={`flex justify-center relative ${currentLanguage === 'bn' ? 'lang-bn' : 'lang-en'}`} variants={fadeIn}>
            <div className="relative max-w-md w-full">
              {/* Demo complaint card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-2xl border border-gray-200 dark:border-slate-700 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-semibold border border-green-200 dark:border-green-800">
                    {t('home.banner.demo.department', 'Public Works Department')}
                  </div>
                  <div className="flex items-center gap-2 bg-green-700 dark:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    <CheckCircle size={14} />
                    {t('home.banner.demo.resolved', 'Resolved')}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-4 tracking-wide">
                    {t('home.banner.demo.complaintId', 'COMPLAINT ID: #JO-2024-001')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('home.banner.demo.cardTitle', 'Road Repair Completed')}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin size={14} />
                    <span>{t('home.banner.demo.location', 'Main Street, Dhaka - Ward 15')}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.banner.demo.cardDescription', 'Potholes on Main Street have been filled and the road is now safe for travel. Quality inspection completed.')}
                  </p>

                  {/* Timeline */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{t('home.banner.demo.timeline.reported', 'Jan 15, 2024')}</div>
                        <div className="text-gray-900 dark:text-white font-medium">{t('home.banner.demo.timeline.issueReported', 'Issue Reported')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{t('home.banner.demo.timeline.review', 'Jan 18, 2024')}</div>
                        <div className="text-gray-900 dark:text-white font-medium">{t('home.banner.demo.timeline.underReview', 'Under Review')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-green-700 dark:bg-green-600 rounded-full mt-2 flex-shrink-0 shadow-lg ring-4 ring-green-100 dark:ring-green-900/50"></div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{t('home.banner.demo.timeline.resolved', 'Jan 25, 2024')}</div>
                        <div className="text-gray-900 dark:text-white font-medium">{t('home.banner.demo.timeline.resolvedStatus', 'Resolved')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">{t('home.banner.demo.resolutionProgress', 'Resolution Progress')}</span>
                    <span className="text-green-700 dark:text-green-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-700 to-green-500 dark:from-green-600 dark:to-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={12} />
                    <span>{t('home.banner.demo.completed', 'Resolved in 10 days')}</span>
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-600 text-white p-5 rounded-2xl shadow-2xl z-20">
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-black">15K+</div>
                    <div className="text-xs font-semibold opacity-90">{t('home.banner.stats.issuesResolved', 'Issues Resolved')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black">95%</div>
                    <div className="text-xs font-semibold opacity-90">{t('home.banner.stats.satisfactionRate', 'Satisfaction Rate')}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Activity ticker */}
        {/* Activity ticker */}
        <motion.div
          className={`bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden ${currentLanguage === 'bn' ? 'lang-bn' : 'lang-en'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Fixed Label */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
            {t('home.banner.recentlyResolved', 'Recently Resolved:')}
          </span>

          {/* Scrolling ticker */}
          <div className="animate-scroll whitespace-nowrap text-gray-800 dark:text-gray-300 font-medium pl-48">
            <span className="mr-12">{t('home.banner.ticker.waterLogging', 'Water logging in Mirpur - Resolved')} •</span>
            <span className="mr-12">{t('home.banner.ticker.streetLight', 'Street light repair in Gulshan - Completed')} •</span>
            <span className="mr-12">{t('home.banner.ticker.garbageCollection', 'Garbage collection in Uttara - Improved')} •</span>
            <span className="mr-12">{t('home.banner.ticker.trafficSignal', 'Traffic signal in Dhanmondi - Fixed')} •</span>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;