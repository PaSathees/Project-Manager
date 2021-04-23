import React from "react";

const Footer: React.FC = () => {
  return (
    <div>
      <footer
        style={{
          height: "50px",
        }}
      >
        <div style={{ textAlign: "center", paddingBottom: "5px" }}>
          <hr />
          &copy; 2021 copyright: iTelaSoft.com
        </div>
      </footer>
    </div>
  );
};

export default Footer;
