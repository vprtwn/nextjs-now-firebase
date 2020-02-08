import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <p>
      <Link href={"/about"}>
        <a className="text-xs">[ about ]</a>
      </Link>
      <Link href={"/terms"}>
        <a className="text-xs">[ terms ]</a>
      </Link>
    </p>
  );
};

export default Footer;
