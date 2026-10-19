import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [action, setAction] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !skill.trim() || !category || !action) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(name.trim())) {
      setError("Name should contain only letters and spaces.");
      return;
    }

    if (skill.trim().length < 2) {
      setError("Skill name must contain at least 2 characters.");
      return;
    }

    const newSkill = {
      id: Date.now(),
      name: name.trim(),
      skill: skill.trim(),
      category,
      action,
    };

    setSkills([...skills, newSkill]);
    setSuccess("Skill added successfully!");

    setName("");
    setSkill("");
    setCategory("");
    setAction("");
  }

  function deleteSkill(id) {
    setSkills(skills.filter((item) => item.id !== id));
    setSuccess("Skill deleted successfully!");
    setError("");
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>SkillSync</h2>
        <span>Learn Together. Grow Together.</span>
      </nav>

      <header className="hero">
        <p className="tagline">YOUR SKILLS, YOUR COMMUNITY</p>
        <h1>Share Skills. Build Connections.</h1>
        <p>
          Teach what you know. Learn what you love.
          Connect with students and grow together.
        </p>
      </header>

      <main>
        <section className="form-container">
          <h2>Share Your Skill</h2>
          <p className="subtitle">
            Tell the community what you can teach or want to learn.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
                setSuccess("");
              }}
            />

            <label htmlFor="skillName">Skill Name</label>
            <input
              id="skillName"
              type="text"
              placeholder="e.g. Python, Guitar, Drawing"
              value={skill}
              onChange={(e) => {
                setSkill(e.target.value);
                setError("");
                setSuccess("");
              }}
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setError("");
                setSuccess("");
              }}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Arts">Arts</option>
              <option value="Communication">Communication</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="action">I want to...</label>
            <select
              id="action"
              value={action}
              onChange={(e) => {
                setAction(e.target.value);
                setError("");
                setSuccess("");
              }}
            >
              <option value="">Choose an option</option>
              <option value="Teach">Teach this skill</option>
              <option value="Learn">Learn this skill</option>
            </select>

            {error && <p className="message error">{error}</p>}
            {success && <p className="message success">{success}</p>}

            <button type="submit" className="submit-button">
              Add My Skill
            </button>
          </form>
        </section>

        <section className="skills-section">
          <h2>Community Skills</h2>
          <p className="subtitle">
            Explore the skills shared by your community.
          </p>

          <div className="skills-grid">
            {skills.length === 0 ? (
              <p className="empty-message">
                No skills added yet. Be the first to share!
              </p>
            ) : (
              skills.map((item) => (
                <article className="skill-card" key={item.id}>
                  <span className="category-badge">{item.category}</span>
                  <h3>{item.skill}</h3>
                  <p>Shared by: {item.name}</p>
                  <p className="action-label">{item.action}</p>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteSkill(item.id)}
                  >
                    Delete
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 SkillSync | Learn, Share, Grow.</p>
      </footer>
    </div>
  );
}

export default App;