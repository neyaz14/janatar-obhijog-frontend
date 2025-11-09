import { motion } from "framer-motion";
import { Target, MapPin, Bell, BarChart3, Globe, Trophy, Zap, TrendingUp, Users, Building } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Smart AI Routing",
      description: "Intelligent complaint routing system that automatically directs issues to the appropriate department using advanced AI algorithms.",
      highlight: "AI-Powered",
    },
    {
      icon: MapPin,
      title: "Location-Based Reporting",
      description: "GPS-enabled reporting system that pinpoints exact locations and provides relevant context for faster resolution.",
      highlight: "GPS Enabled",
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description: "Instant updates on complaint status, progress tracking, and resolution notifications delivered directly to your device.",
      highlight: "Instant Updates",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Complete transparency with detailed progress tracking, timeline updates, and resolution status monitoring.",
      highlight: "Full Transparency",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Seamless communication in both Bengali and English with automatic translation and localized support.",
      highlight: "Bilingual",
    },
    {
      icon: Trophy,
      title: "Reward System",
      description: "Gamified experience that rewards active community participation and encourages civic engagement.",
      highlight: "Gamified",
    },
  ];

  const stats = [
    {
      icon: Zap,
      number: "2.5x",
      label: "Faster Resolution",
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Success Rate",
    },
    {
      icon: Users,
      number: "50K+",
      label: "Active Users",
    },
    {
      icon: Building,
      number: "200+",
      label: "Partner Departments",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="theme-bg-secondary py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="mb-6">
            <span className="block text-4xl lg:text-5xl font-black theme-text-primary mb-3 leading-tight">
              Powerful Features
            </span>
            <span className="block text-xl lg:text-2xl font-bold theme-text-secondary leading-relaxed">
              Built for Modern Governance
            </span>
          </h2>
          <p className="text-xl theme-text-secondary leading-relaxed max-w-4xl mx-auto">
            Experience cutting-edge technology designed to streamline civic engagement and ensure efficient resolution of community issues.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="theme-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-green-600 dark:bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <span className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {feature.highlight}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold theme-text-primary mb-4 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="theme-text-secondary leading-relaxed mb-6 text-base">
                  {feature.description}
                </p>
                
                <div className="flex justify-start relative z-10">
                  <motion.button 
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More →
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="theme-card rounded-3xl p-12 border border-gray-200 dark:border-slate-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4 p-4 bg-gray-500 dark:bg-slate-600 rounded-2xl border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white dark:bg-slate-500 rounded-2xl flex items-center justify-center shadow-lg border border-gray-200 dark:border-slate-500 group-hover:shadow-xl transition-shadow duration-300">
                    <IconComponent size={24} className="text-green-600 dark:text-green-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black theme-text-primary leading-none mb-1">
                      {stat.number}
                    </span>
                    <span className="text-sm font-semibold theme-text-secondary leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {}; // Removed inline styles as we're using Tailwind classes

// Add custom CSS for special effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  @media (max-width: 768px) {
    .grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3 {
      grid-template-columns: 1fr !important;
    }
    
    .text-4xl.lg\\:text-5xl {
      font-size: 2.5rem !important;
    }
    
    .text-xl.lg\\:text-2xl {
      font-size: 1.25rem !important;
    }
    
    .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  
  @media (max-width: 480px) {
    .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default FeaturesSection;