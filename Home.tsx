"use client";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PazagoLandingPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Send message to OpenAI API and get response
  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", // or gpt-3.5-turbo
          messages: [{ role: "user", content: userInput }],
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      useEffect(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, [messages]);

      const botMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        {
          text: "Oops! Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };
  // Toggle between SignUp/SignIn

  // Auto-switch carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    let scrollAmount = 0;
    const scrollSpeed = 4; // Speed of scroll
    const delay = 0; // Delay between scrolls (in ms)

    const scrollContent = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // Reset to the start after scrolling half width
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft = scrollAmount;
        }
      }
    };

    const interval = setInterval(scrollContent, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pazago-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Expario</div>
        <ul className="nav-links">
          <li>HAome</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
        <a
          href="https://your-other-website.com"
          target="_blank"
          rel="noopener noreferrer"
          className="login-btn"
        >
          Login
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Expand Your Business Globally with Expario</h1>
          <p>
            Your Trusted Partner for International Export Guidance and
            Solutions.
          </p>
          <button
            className="get-started-btn"
            onClick={() => setShowModal(true)}
          >
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80"
            alt="Export Business"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Expertise</h3>
          <p>
            Years of experience guiding businesses through export processes.
          </p>
        </div>
        <div className="feature-card">
          <h3>Support</h3>
          <p>Dedicated support at every stage of your export journey.</p>
        </div>
        <div className="feature-card">
          <h3>Resources</h3>
          <p>
            Access essential documents, market insights, and best practices.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2>Proudly empowering exporters across industries</h2>
        <div className="partners-logos-box">
          <div className="partners-logos">
            <img
              src="https://static.wixstatic.com/media/6c6e02_cfea0faa50da4f54b7e61218fd57e656~mv2.png"
              alt="Harsha Engineers"
              className="partner-logo"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tICHkLoZVXU5HqEQmloli2v_k6WA9lHJKg&s"
              alt="Deepak"
              className="partner-logo"
            />
            <img
              src="https://media.licdn.com/dms/image/v2/C4E0BAQFPZzzD-zH6Eg/company-logo_200_200/company-logo_200_200/0/1630619999589?e=2147483647&v=beta&t=HZvHqIefVSuY3O7bhzf_NJxtdyxzwx2pKH3kGALuZes"
              alt="Spar Industries"
              className="partner-logo"
            />
            <img
              src="https://sukhachemicals.com/img/products/1.jpg"
              alt="Sukha Chemical Industries"
              className="partner-logo"
            />
            {/* Duplicate for seamless infinite scrolling */}
            <img
              src="https://static.wixstatic.com/media/6c6e02_cfea0faa50da4f54b7e61218fd57e656~mv2.png"
              alt="Harsha Engineers"
              className="partner-logo"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tICHkLoZVXU5HqEQmloli2v_k6WA9lHJKg&s"
              alt="Deepak"
              className="partner-logo"
            />
            <img
              src="https://media.licdn.com/dms/image/v2/C4E0BAQFPZzzD-zH6Eg/company-logo_200_200/company-logo_200_200/0/1630619999589?e=2147483647&v=beta&t=HZvHqIefVSuY3O7bhzf_NJxtdyxzwx2pKH3kGALuZes"
              alt="Spar Industries"
              className="partner-logo"
            />
            <img
              src="https://sukhachemicals.com/img/products/1.jpg"
              alt="Sukha Chemical Industries"
              className="partner-logo"
            />
          </div>
        </div>
      </section>

      {/* Industry Updates Carousel */}
      <section className="industry-carousel">
        <div className="carousel-content">
          <h2>Bringing you the latest updates from the industry</h2>

          <div className="carousel-items">
            {["News", "Alerts", "Events"].map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="carousel-icon"></div>
                <div>
                  <h3>{item}</h3>
                  <p>
                    {item === "News"
                      ? "Catch up on the latest news"
                      : item === "Alerts"
                      ? "Stay informed with real-time alerts"
                      : "Stay ahead with the hottest trade events"}
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${(index + 1) * 33}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="insights-btn">Get Insights Now &gt;</button>
        </div>

        {/* Changing Images */}
        <div className="carousel-phone">
          <img
            src={
              [
                "https://img.freepik.com/premium-vector/news-mobile-phone_91756-1402.jpg",
                "https://img.freepik.com/premium-vector/news-mobile-phone_91756-1402.jpg",
                "https://img.freepik.com/premium-vector/news-mobile-phone_91756-1402.jpg",
              ][activeIndex]
            }
            alt={`${["News", "Alerts", "Events"][activeIndex]} App View`}
            className="phone-image"
          />
        </div>
      </section>

      {/* Talk of the trade world Section */}
      <section className="talk-section">
        <h2>Talk of the trade world</h2>
        <div className="video-scroll-container" ref={scrollRef}>
          <div className="video-scroll">
            {/* Duplicate videos for seamless looping */}
            {[...Array(2)].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="video-card">
                  <video
                    src="https://pazago-assets.s3.us-east-2.amazonaws.com/website/influencers/owais.mp4"
                    controls
                    className="video-content"
                  ></video>
                </div>
                <div className="video-card">
                  <video
                    src="https://pazago-assets.s3.us-east-2.amazonaws.com/website/influencers/dheeraj_pandey.mp4"
                    controls
                    className="video-content"
                  ></video>
                </div>
                <div className="video-card">
                  <video
                    src="https://pazago-assets.s3.us-east-2.amazonaws.com/website/influencers/mohit_kumar.mp4"
                    controls
                    className="video-content"
                  ></video>
                </div>
                <div className="video-card">
                  <video
                    src="https://pazago-assets.s3.us-east-2.amazonaws.com/website/influencers/rashad_rehman.mp4"
                    controls
                    className="video-content"
                  ></video>
                </div>
                <div className="video-card">
                  <video
                    src="https://pazago-assets.s3.us-east-2.amazonaws.com/website/influencers/kd_sushma.mp4"
                    controls
                    className="video-content"
                  ></video>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Section - Add it here */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <h2>{isSignUp ? "Create an Account" : "Sign In"}</h2>

            <form className="form">
              {isSignUp && (
                <>
                  <input type="text" placeholder="Full Name" required />
                  <input type="tel" placeholder="Phone Number" required />
                </>
              )}
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              )}
              <button type="submit" className="submit-btn">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <p className="switch-form">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="switch-link"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <h3>Expario</h3>
            </div>
            <p className="footer-contact">connect@expario.com</p>
            <p className="footer-phone">+91 800 900 6225</p>

            {/* Social Icons */}
          </div>
          <div className="footer-right">
            <h4>COMPANY</h4>
            <ul>
              <li>
                <a href="#">Why Expario?</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © {new Date().getFullYear()} - Pazago - All Rights
            Reserved
          </p>
        </div>
      </footer>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => alert("Chatbot Opened!")}>
        <img
          src="https://img.icons8.com/fluency/140/chatbot.pnghttps://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
          alt="Chat with us"
          className="chatbot-img"
        />
      </div>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setShowChat(true)}>
        <img
          src="/assets/chatbot-icon.png"
          alt="Chat with us"
          className="chatbot-img"
        />
      </div>

      {/* Chatbot Modal */}
      {showChat && (
        <div className="chatbot-container">
          <div className="chat-header">
            <h4>Chat with Pazago AI</h4>
            <button onClick={() => setShowChat(false)} className="close-btn">
              ✖
            </button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PazagoLandingPage;
