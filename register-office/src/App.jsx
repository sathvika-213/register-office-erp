import React, { useState } from "react";
import "./App.css";
import Login from "./Login.jsx";

/* =========================
   CIRCULAR DATA
========================= */

const circulars = [
  {
    id: "37692",
    category: "Important",
    icon: "🚨",
    title:
      "Caution Against Malpractice, Fraudulent Communications, and Fake Placement / Internship Offers-Reg",
    description:
      "Students are advised to remain alert and careful during placement drives, online examinations, internship selections, recruitment tests, and related activities.",
    date: "11 Aug 2026",
    important: true,
    archived: false,
  },

  {
    id: "37666",
    category: "Academic",
    icon: "🎓",
    title:
      "Organizing Guest Lecture (Online) in the Department of Biotechnology on 14th August 2026 at KLEF Vaddeswaram Campus",
    description:
      "Information regarding the online guest lecture organized by the Department of Biotechnology.",
    date: "06 Aug 2026",
    important: false,
    archived: false,
  },

  {
    id: "37652",
    category: "Scholarship",
    icon: "💰",
    title:
      "Call for Registration by Students for Various Scholarships from Government of India in National Scholarship Portal - Reg.",
    description:
      "Students can register for eligible scholarship schemes through the National Scholarship Portal.",
    date: "05 Aug 2026",
    important: false,
    archived: false,
  },

  {
    id: "37601",
    category: "Examination",
    icon: "📝",
    title:
      "Competitive Examination & Recruitment Opportunities for Students - Reg.",
    description:
      "Information about competitive examinations and recruitment opportunities available for students.",
    date: "24 Jul 2026",
    important: false,
    archived: false,
  },

  {
    id: "37595",
    category: "Examination",
    icon: "📚",
    title:
      "GATE 2027 registration, eligibility, examination schedule and guidance on relevant GATE papers/sections for eligible students - Reg.",
    description:
      "Important information regarding GATE 2027 registration and examination schedule.",
    date: "22 Jul 2026",
    important: false,
    archived: true,
  },

  {
    id: "37551",
    category: "Academic",
    icon: "🎓",
    title:
      "Commencement of Class Work for the Students of Odd Semester - Reg.",
    description:
      "Academic information regarding commencement of class work for students.",
    date: "10 Jul 2026",
    important: false,
    archived: true,
  },

  {
    id: "37473",
    category: "Events",
    icon: "🎯",
    title:
      "Conducting of MSME Hackathon 6.0 - Inviting Innovative Ideas from Students, Faculty, Startups and MSMEs - Communication - Reg.",
    description:
      "Students are invited to participate and submit innovative ideas for MSME Hackathon 6.0.",
    date: "30 Jun 2026",
    important: false,
    archived: true,
  },

  {
    id: "37440",
    category: "Events",
    icon: "🚀",
    title:
      "Invitation for Snapdragon Multiverse Hackathon by Qualcomm Academy - Reg.",
    description:
      "Students are invited to participate in the Snapdragon Multiverse Hackathon.",
    date: "25 Jun 2026",
    important: false,
    archived: true,
  },

  {
    id: "37439",
    category: "Certification",
    icon: "🏆",
    title:
      "ServiceNow CIS-DF (CMDB and CSDM) Certification - Free First Exam attempt until 30th June 2026 - Reg.",
    description:
      "Information about the ServiceNow certification opportunity available for students.",
    date: "24 Jun 2026",
    important: false,
    archived: true,
  },

  {
    id: "37437",
    category: "Events",
    icon: "🌐",
    title:
      "Participation in GDTA Annual Conference 2026 & International Hackathon - Reg.",
    description:
      "Students can participate in the annual conference and international hackathon.",
    date: "24 Jun 2026",
    important: false,
    archived: true,
  },

  {
    id: "37325",
    category: "Academic",
    icon: "📖",
    title:
      "Standard Operating Procedure (SoP) on Best Library User Initiative - Reg.",
    description:
      "Information regarding the Standard Operating Procedure for the Best Library User initiative.",
    date: "11 May 2026",
    important: false,
    archived: true,
  },
];

/* =========================
   SIDEBAR CATEGORIES
========================= */

const categories = [
  {
    name: "My Circulars",
    icon: "📢",
  },
  {
    name: "Important",
    icon: "⭐",
  },
  {
    name: "Academic",
    icon: "🎓",
  },
  {
    name: "Scholarship",
    icon: "💰",
  },
  {
    name: "Examination",
    icon: "📝",
  },
  {
    name: "Events",
    icon: "🎯",
  },
  {
    name: "Certification",
    icon: "🏆",
  },
];

/* =========================
   APP
========================= */

function App() {
  /* =========================
     LOGIN USER
  ========================= */

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  /* =========================
     PAGE STATES
  ========================= */

  const [selectedCategory, setSelectedCategory] =
    useState("My Circulars");

  const [search, setSearch] = useState("");

  const [sortNewest, setSortNewest] = useState(true);

  const [showHelp, setShowHelp] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [showCircular, setShowCircular] = useState(null);

  /* =========================
     COUNTS
  ========================= */

  const totalCirculars = circulars.length;

  const importantCount = circulars.filter(
    (item) => item.important
  ).length;

  const archivedCount = circulars.filter(
    (item) => item.archived
  ).length;

  /* =========================
     CHANGE CATEGORY
  ========================= */

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };

  /* =========================
     FILTER + SEARCH + SORT
  ========================= */

  const filteredCirculars = circulars
    .filter((item) => {
      if (selectedCategory === "My Circulars") {
        return true;
      }

      if (selectedCategory === "Circular Archive") {
        return item.archived;
      }

      return item.category === selectedCategory;
    })

    .filter((item) => {
      const searchableText =
        `${item.title} ${item.category} ${item.id} ${item.description}`.toLowerCase();

      return searchableText.includes(
        search.toLowerCase()
      );
    })
    .sort((a, b) => {
      if (sortNewest) {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setShowProfile(false);
  };

  /* =========================
     LOGIN PAGE
  ========================= */

  if (!user) {
    return (
      <Login
        onLogin={(loggedInUser) => {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
          );

          setUser(loggedInUser);
        }}
      />
    );
  }

  /* =========================
     MAIN PAGE
  ========================= */

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            🎓
          </div>

          <div>
            <h2>KLEF</h2>
            <span>Student Portal</span>
          </div>

        </div>

        <div className="sidebar-title">
          REGISTER OFFICE
        </div>

        <nav className="sidebar-nav">

          {categories.map((category) => (
            <button
              key={category.name}
              className={`nav-item ${
                selectedCategory === category.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleCategory(category.name)
              }
            >

              <span className="nav-icon">
                {category.icon}
              </span>

              <span>{category.name}</span>

            </button>
          ))}

          {/* ARCHIVE */}

          <button
            className={`nav-item ${
              selectedCategory === "Circular Archive"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleCategory("Circular Archive")
            }
          >

            <span className="nav-icon">
              📁
            </span>

            <span>Circular Archive</span>

          </button>

        </nav>

        {/* NEED HELP */}

        <button
          className="help-card"
          onClick={() => setShowHelp(true)}
        >

          <div className="help-icon">
            💬
          </div>

          <div>
            <strong>Need Help?</strong>

            <span>
              Contact Technical Team
            </span>
          </div>

        </button>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="breadcrumb">
            Student ERP / Register Office /{" "}
            {selectedCategory}
          </div>

          <div className="top-actions">

            <button className="notification">
              🔔
            </button>

            <button
              className="profile"
              onClick={() =>
                setShowProfile(!showProfile)
              }
            >

              <div className="avatar">

                {(
                  user.fullName ||
                  user.name ||
                  "S"
                )
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div className="profile-info">

                <strong>
                  {user.fullName ||
                    user.name ||
                    "Student"}
                </strong>

                <span>
                  {user.studentId ||
                    "Student"}
                </span>

              </div>

              <span>⌄</span>

            </button>

            {showProfile && (
              <div className="profile-menu">

                <div>
                  👤 My Profile
                </div>

                <div>
                  ⚙️ Settings
                </div>

                <div onClick={handleLogout}>
                  🚪 Logout
                </div>

              </div>
            )}

          </div>

        </header>

        {/* PAGE TITLE */}

        <section className="page-heading">

          <h1>
            Register Office
          </h1>

        </section>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <span className="hero-label">
              REGISTER OFFICE
            </span>

            <h1>
              My Circulars & Notices
            </h1>

            <p>
              Stay updated with important
              university announcements,
              academic notices and
              opportunities.
            </p>

          </div>

          <div className="hero-icon">
            📋
          </div>

        </section>

        {/* STATISTICS */}

        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              📢
            </div>

            <div>
              <span>Total Circulars</span>
              <strong>{totalCirculars}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon red">
              🚨
            </div>

            <div>
              <span>Important</span>
              <strong>{importantCount}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              📁
            </div>

            <div>
              <span>Archived</span>
              <strong>{archivedCount}</strong>
            </div>

          </div>

        </section>

        {/* =========================
            SEARCH + FILTER
        ========================= */}

        <section className="filters">

          {/* SEARCH */}

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search circulars, categories or ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

          {/* CATEGORY DROPDOWN */}

          <select
            className="current-filter"
            value={selectedCategory}
            onChange={(e) =>
              handleCategory(e.target.value)
            }
          >

            <option value="My Circulars">
              My Circulars
            </option>

            <option value="Important">
              Important
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Scholarship">
              Scholarship
            </option>

            <option value="Examination">
              Examination
            </option>

            <option value="Events">
              Events
            </option>

            <option value="Certification">
              Certification
            </option>

            <option value="Circular Archive">
              Circular Archive
            </option>

          </select>

          {/* SORT */}

          <button
            className="sort-button"
            onClick={() =>
              setSortNewest(!sortNewest)
            }
          >
            ↕{" "}
            {sortNewest
              ? "Newest"
              : "Oldest"}
          </button>

        </section>

        {/* =========================
            CIRCULARS
        ========================= */}

        <section className="circular-section">

          <div className="section-heading">

            <div>

              <h2>
                {selectedCategory ===
                "My Circulars"
                  ? "Latest Circulars"
                  : selectedCategory}
              </h2>

              <p>
                Important updates from
                the Register Office
              </p>

            </div>

            <span className="notice-count">
              {filteredCirculars.length} notices
            </span>

          </div>

          {/* CARDS */}

          <div className="circular-grid">

            {filteredCirculars.length > 0 ? (

              filteredCirculars.map((item) => (

                <article
                  className={`circular-card ${
                    item.important
                      ? "important-card"
                      : ""
                  }`}
                  key={item.id}
                >

                  <div className="card-top">

                    <span
                      className={`category-badge ${item.category.toLowerCase()}`}
                    >
                      {item.icon}{" "}
                      {item.category}
                    </span>

                    <span className="circular-id">
                      #{item.id}
                    </span>

                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="card-footer">

                    <span>
                      📅 {item.date}
                    </span>

                    <button
                      className="view-button"
                      onClick={() =>
                        setShowCircular(item)
                      }
                    >
                      View Circular →
                    </button>

                  </div>

                </article>

              ))

            ) : (

              <div className="empty-state">

                <div>🔍</div>

                <h3>
                  No Circulars Found
                </h3>

                <p>
                  Try another search
                  or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory(
                      "My Circulars"
                    );
                  }}
                >
                  Show All Circulars
                </button>

              </div>

            )}

          </div>

        </section>

      </main>

      {/* =========================
          CIRCULAR MODAL
      ========================= */}

      {showCircular && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowCircular(null)
          }
        >

          <div
            className="circular-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setShowCircular(null)
              }
            >
              ×
            </button>

            <div className="modal-category">
              {showCircular.icon}{" "}
              {showCircular.category}
            </div>

            <span className="modal-circular-id">
              Circular ID: #{showCircular.id}
            </span>

            <h2>
              {showCircular.title}
            </h2>

            <p className="modal-description">
              {showCircular.description}
            </p>

            <div className="modal-date">
              📅 Published on{" "}
              {showCircular.date}
            </div>

            <div className="modal-notice">

              <span>📢</span>

              <p>
                Please refer to the official
                circular/document for complete
                instructions and applicable
                deadlines.
              </p>

            </div>

            <button
              className="modal-close-button"
              onClick={() =>
                setShowCircular(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* =========================
          HELP MODAL
      ========================= */}

      {showHelp && (

        <div
          className="modal-overlay"
          onClick={() => setShowHelp(false)}
        >

          <div
            className="help-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setShowHelp(false)
              }
            >
              ×
            </button>

            <div className="modal-icon">
              💬
            </div>

            <h2>
              Need Technical Help?
            </h2>

            <p>
              Facing any technical issue
              while using the Register
              Office section? Our technical
              team is here to help.
            </p>

            <div className="contact-options">

              <div className="contact-option">

                <span>📧</span>

                <div>

                  <strong>
                    Email Support
                  </strong>

                  <p>
                    support@klef.edu.in
                  </p>

                </div>

              </div>

              <div className="contact-option">

                <span>📞</span>

                <div>

                  <strong>
                    Technical Support
                  </strong>

                  <p>
                    +91 90000 00000
                  </p>

                </div>

              </div>

              <div className="contact-option">

                <span>🕐</span>

                <div>

                  <strong>
                    Support Hours
                  </strong>

                  <p>
                    Monday – Friday,
                    9:00 AM – 5:00 PM
                  </p>

                </div>

              </div>

            </div>

            <div className="modal-buttons">

              <a
                href="mailto:support@klef.edu.in"
                className="email-button"
              >
                📧 Email Technical Team
              </a>

              <button
                className="cancel-button"
                onClick={() =>
                  setShowHelp(false)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;