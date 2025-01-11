import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <h5 className="text-lg font-semibold">Company</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/" 
                  className="text-gray-400 hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/" 
                  className="text-gray-400 hover:text-white"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/" 
                  className="text-gray-400 hover:text-white"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="" 
                  className="text-gray-400 hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="" 
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="" 
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold">Contact</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
