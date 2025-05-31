import React, { useState, useEffect } from 'react';
import './KonamiCode.css';

// Move these outside the component to avoid ESLint warning
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const keyDisplayNames = {
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
  'KeyB': 'B',
  'KeyA': 'A'
};

const KonamiCode = () => {
  const [sequence, setSequence] = useState([]);
  const [showKeys, setShowKeys] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSecretContent, setShowSecretContent] = useState(false);

  const secretProjects = [
    {
      title: "🚀 Secret Space Project",
      description: "A top-secret Mars rover simulation built with Unity and C#. Features realistic physics and terrain generation.",
      tech: "Unity, C#, NASA APIs",
      status: "🔬 In Development"
    },
    {
      title: "🎮 Retro Game Engine",
      description: "A custom 2D game engine inspired by classic arcade games. Built from scratch with modern web technologies.",
      tech: "JavaScript, WebGL, Canvas API",
      status: "✨ Prototype Complete"
    },
    {
      title: "🤖 AI Assistant 'NOVA'",
      description: "Personal AI assistant with natural language processing and task automation capabilities.",
      tech: "Python, TensorFlow, OpenAI API",
      status: "🧠 Training Phase"
    },
    {
      title: "🔐 Quantum Encryption Tool",
      description: "Experimental encryption software using quantum-inspired algorithms for next-level security.",
      tech: "Rust, Quantum Algorithms",
      status: "🔬 Research Phase"
    },
    {
      title: "🌐 Neural Network Visualizer",
      description: "Interactive 3D visualization tool for understanding deep learning architectures.",
      tech: "Three.js, Python, Flask",
      status: "🎨 Beta Version"
    }
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.code;
      
      // Add visual feedback for the pressed key
      if (keyDisplayNames[key]) {
        setShowKeys(prev => {
          const newKeys = [...prev, { key: keyDisplayNames[key], id: Date.now() }];
          // Remove keys after 2 seconds
          setTimeout(() => {
            setShowKeys(current => current.filter(k => k.id !== newKeys[newKeys.length - 1].id));
          }, 2000);
          return newKeys;
        });

        setSequence(prevSequence => {
          const newSequence = [...prevSequence, key];
          
          // Check if the sequence matches the beginning of Konami code
          const isValidSequence = konamiSequence.slice(0, newSequence.length)
            .every((code, index) => code === newSequence[index]);
          
          if (!isValidSequence) {
            // Reset if wrong key is pressed
            return [];
          }
          
          // Check if complete sequence is entered
          if (newSequence.length === konamiSequence.length) {
            setIsUnlocked(true);
            setShowSecretContent(true);
            return [];
          }
          
          return newSequence;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const closeSecretContent = () => {
    setShowSecretContent(false);
    setIsUnlocked(false);
  };

  return (
    <>
      {/* Visual feedback for pressed keys */}
      <div className="konami-keys-display">
        {showKeys.map((keyInfo) => (
          <div key={keyInfo.id} className="konami-key-press">
            {keyInfo.key}
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      {sequence.length > 0 && !isUnlocked && (
        <div className="konami-progress">
          <div className="konami-progress-bar">
            <div 
              className="konami-progress-fill"
              style={{ width: `${(sequence.length / konamiSequence.length) * 100}%` }}
            />
          </div>
          <div className="konami-progress-text">
            {sequence.length}/{konamiSequence.length}
          </div>
        </div>
      )}

      {/* Secret content modal */}
      {showSecretContent && (
        <div className="konami-modal-overlay">
          <div className="konami-modal">
            <div className="konami-modal-header">
              <h2>🎉 Konami Code Activated! 🎉</h2>
              <button className="konami-close-btn" onClick={closeSecretContent}>
                ×
              </button>
            </div>
            <div className="konami-modal-content">
              <p className="konami-unlock-message">
                🎮 You've unlocked Omer's secret project vault! These are experimental and under-the-radar projects.
              </p>
              <div className="secret-projects-grid">
                {secretProjects.map((project, index) => (
                  <div key={index} className="secret-project-card">
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      <strong>Tech Stack:</strong> {project.tech}
                    </div>
                    <div className="project-status">{project.status}</div>
                  </div>
                ))}
              </div>
              <div className="konami-footer">
                <p>🤫 Keep this between us! These projects are still cooking...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KonamiCode; 