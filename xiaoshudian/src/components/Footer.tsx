import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About us</Link>
        <Link to="/imprint">Imprint</Link>
      </div>
      <div className="footer-attribution">
        <a href="https://www.flaticon.com/de/kostenlose-icons/gefallt-mir-knopf" title="gefällt mir knopf Icons">
          Gefällt mir knopf Icons erstellt von Mudassir designs - Flaticon
        </a>
        <br />
        <a href="https://www.flaticon.com/de/kostenlose-icons/bleistift" title="bleistift Icons">
          Bleistift Icons erstellt von Freepik - Flaticon
        </a>
        <br />
        <a href="https://www.flaticon.com/de/kostenlose-icons/loschen" title="löschen Icons">Löschen Icons erstellt von Arkinasi - Flaticon</a>
        <br />
        <a href="https://www.flaticon.com/de/kostenlose-icons/supermarkt" title="supermarkt Icons">Supermarkt Icons erstellt von Good Ware - Flaticon</a>
      </div>
    </footer>
  );
};

export default Footer;
