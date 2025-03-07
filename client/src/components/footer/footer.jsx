import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-title">ShopSense</h2>
          <p>Your one-stop shop for the best products at unbeatable prices.</p>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h2 className="footer-title">Contact Us</h2>
          <p>Email: support@shopsense.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Bangalore, India</p>
        </div>
        {/* Copyright */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} ShopSense. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
