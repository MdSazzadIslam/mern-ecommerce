import React from "react";
import profile from "../assests/images/profile.jpg";
import "./About.css";
const About = () => {
  return (
    <div className="about_card">
      <img
        src={profile}
        alt="Md Sazzadul Islam"
        style={{ width: "100%", height: "10%" }}
      />
      <h6>Md Sazzadul Islam</h6>
      <p className="title">Senior Full Stack Developer</p>
      <p>Dhaka, Bangladesh</p>
      <p>netsazzad@gmail.com</p>

      <a
        className="about_a"
        href="https://github.com/MdSazzadIslam"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-github" />
      </a>
      <p>
        <button className="about_btn">Contact</button>
      </p>
    </div>
  );
};

export default About;
