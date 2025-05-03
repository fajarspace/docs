import { components } from "@/theme.config";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerItems = components.filter((item) => item.type === "footer");

  return (
    <>
      <small style={{ display: "block", marginTop: "8rem" }}>
        {footerItems.map((item, index) => (
          <div key={index}>
            <span>
              <time>{item.year}</time> {item.name}
            </span>
            <span>
              {item.url ? <Link href={item.url}>{item.social}</Link> : <></>}
            </span>
          </div>
        ))}
      </small>
    </>
  );
};

export default Footer;
