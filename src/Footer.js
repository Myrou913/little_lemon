function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <p>© Little Lemon</p>

      <address aria-label="Contact information">
        <p>123 Lemon Street, Chicago, IL</p>
        <p>
          <a href="tel:+13125550199" aria-label="Call us at (312) 555-0199">
            (312) 555-0199
          </a>
        </p>
        <p>
          <a href="mailto:hello@littlelemon.com" aria-label="Email us at hello@littlelemon.com">
            hello@littlelemon.com
          </a>
        </p>
      </address>

      <nav aria-label="Social media links">
        <ul role="list" style={{ listStyle: "none", padding: 0, display: "flex", gap: "12px", justifyContent: "center" }}>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Facebook">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Instagram">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Twitter">
              Twitter
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
