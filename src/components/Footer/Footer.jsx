import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  return (
    <MDBFooter className="bg-light text-center text-lg-start text-white">
      <MDBContainer className="p-4 pb-0">
        {/* Social Media Buttons Section */}
        <section className="mb-4 d-flex justify-content-center">
          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://facebook.com"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#55acee" }}
            href="https://twitter.com"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="https://google.com"
            role="button"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="https://instagram.com"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="https://linkedin.com"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com"
            role="button"
          >
            <FontAwesomeIcon icon={faGithub} />
          </MDBBtn>
        </section>
      </MDBContainer>

      {/* Copyright Section */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        © 2024 Copyright:
        <a
          className="text-white"
          href="https://nexusInc.com/"
          style={{ marginLeft: "10px" }}
        >
          nexusInc.com
        </a>
      </div>
    </MDBFooter>
  );
}
