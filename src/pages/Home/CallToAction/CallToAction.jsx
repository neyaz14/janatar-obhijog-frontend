import { motion } from "framer-motion";
import {
  Zap,
  Smartphone,
  Building,
  Clock,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="theme-bg-secondary py-24 relative overflow-hidden">
      <div style={styles.container}>
        <div style={styles.content}>
          <motion.div
            style={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold theme-text-primary mb-6 leading-tight">
              Ready to Make a Difference in Your Community?
            </h2>
            <p className="text-xl theme-text-secondary leading-relaxed mb-10">
              Join thousands of proactive citizens who are transforming their
              neighborhoods. Your report can initiate real change and contribute
              to building better communities across Bangladesh.
            </p>
            <div style={styles.features}>
              <div style={styles.feature}>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <div style={styles.featureText}>
                  <h4 className="text-lg font-semibold theme-text-primary mb-1">
                    Quick & Easy Reporting
                  </h4>
                  <p className="theme-text-secondary leading-relaxed">
                    File complaints in minutes with our streamlined process
                  </p>
                </div>
              </div>
              <div style={styles.feature}>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smartphone
                    size={20}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <div style={styles.featureText}>
                  <h4 className="text-lg font-semibold theme-text-primary mb-1">
                    Real-time Updates
                  </h4>
                  <p className="theme-text-secondary leading-relaxed">
                    Track your complaint status in real-time
                  </p>
                </div>
              </div>
              <div style={styles.feature}>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building
                    size={20}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <div style={styles.featureText}>
                  <h4 className="text-lg font-semibold theme-text-primary mb-1">
                    Direct Authority Contact
                  </h4>
                  <p className="theme-text-secondary leading-relaxed">
                    Your reports go directly to relevant government departments
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={styles.actionContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div style={styles.actionCard}>
              <div style={styles.cardHeader}>
                <Shield size={24} color="#1C733A" />
                <h3 style={styles.cardTitle}>Start Your First Complaint</h3>
              </div>
              <p style={styles.cardDescription}>
                Report issues in your area and track their resolution from start
                to finish with complete transparency.
              </p>

              <Link to={"/dashboard/myComplaints"}>
                <motion.button
                  style={styles.primaryButton}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px rgba(255, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Complaint Now
                </motion.button>
              </Link>

              <div style={styles.divider}>
                <span style={styles.dividerText}>
                  or explore existing issues
                </span>
              </div>

              <Link to={'/all-complain'}>
                <motion.button
                  style={styles.secondaryButton}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse Existing Issues
                </motion.button>
              </Link>

              <div style={styles.trustIndicators}>
                <div style={styles.trustItem}>
                  <Clock size={16} color="#1C733A" />
                  <div>
                    <span style={styles.trustNumber}>24/7</span>
                    <span style={styles.trustLabel}>Support Available</span>
                  </div>
                </div>
                <div style={styles.trustItem}>
                  <div style={styles.freeBadge}>FREE</div>
                  <div>
                    <span style={styles.trustNumber}>100%</span>
                    <span style={styles.trustLabel}>Free Service</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={styles.bottomSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div style={styles.urgentAlert}>
            <div style={styles.alertIcon}>
              <AlertTriangle size={32} color="#DC2626" />
            </div>
            <div style={styles.alertContent}>
              <Link to={"/dashboard/myComplaints"}>
                <h4 style={styles.alertTitle}>Emergency or Critical Issues?</h4>
              </Link>
              <p style={styles.alertText}>
                For urgent matters requiring immediate attention (safety
                hazards, infrastructure emergencies), use our priority reporting
                system for faster response.
              </p>
              <motion.button
                style={styles.emergencyButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Report Emergency Issue
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#f8fafc",
    padding: "100px 0",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  content: {
    display: "flex",
    alignItems: "flex-start",
    gap: "60px",
    marginBottom: "80px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textContent: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "500px",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#000000",
    marginBottom: "24px",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "1.2rem",
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  featureIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: "#FECACA",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
  },
  featureTextH4: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#000000",
    margin: "0 0 4px 0",
  },
  featureTextP: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.5",
  },
  actionContent: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "450px",
    display: "flex",
    justifyContent: "center",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    width: "100%",
    textAlign: "center",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#000000",
    margin: "0",
  },
  cardDescription: {
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "32px",
    fontSize: "1rem",
  },
  primaryButton: {
    backgroundColor: "#FF0000",
    color: "#ffffff",
    border: "none",
    padding: "18px 32px",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "20px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
  },
  divider: {
    position: "relative",
    margin: "24px 0",
    textAlign: "center",
  },
  dividerText: {
    backgroundColor: "#ffffff",
    color: "#9ca3af",
    padding: "0 16px",
    fontSize: "0.9rem",
    position: "relative",
    zIndex: 1,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#FF0000",
    border: "2px solid #FF0000",
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "32px",
    transition: "all 0.3s ease",
  },
  trustIndicators: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "24px",
    borderTop: "1px solid #e5e7eb",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  trustNumber: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1C733A",
    display: "block",
  },
  trustLabel: {
    fontSize: "0.85rem",
    color: "#6b7280",
    display: "block",
  },
  freeBadge: {
    backgroundColor: "#1C733A",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
  },
  urgentAlert: {
    backgroundColor: "#FEF2F2",
    border: "2px solid #FECACA",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    maxWidth: "800px",
    width: "100%",
  },
  alertIcon: {
    flexShrink: 0,
  },
  alertContent: {
    flex: "1",
  },
  alertTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: "8px",
  },
  alertText: {
    color: "#7f1d1d",
    marginBottom: "20px",
    lineHeight: "1.5",
    fontSize: "1rem",
  },
  emergencyButton: {
    backgroundColor: "#DC2626",
    color: "#ffffff",
    border: "none",
    padding: "14px 28px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
  },
};

export default CallToAction;
