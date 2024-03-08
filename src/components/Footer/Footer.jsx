"use client";
import React from "react";

import {
  faDiscord,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fortawesome/fontawesome-svg-core/styles.css";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.Container}>
      <p>Nexus, Inc.</p>
      <div className={styles.Links}>
        <a href="/products">See products</a>

        <a href="/about">About</a>

        <a href="/">Home</a>
      </div>
      <div className={styles.Icons}>
        <a href="http://discord.com">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="http://instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="http://x.com">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
