import React from 'react';
const ResumeModel = ({ onClose }) => {
  return (
    <div className="resume-model-overlay">
      <div className="resume-window" style={{ width: '80%', height: '80%' }}>
        <div className="resume-titlebar">
          <div className="resume-buttons">
            <div className="resume-close">
              <a className="resume-closebutton" href="#" onClick={onClose}><span><strong>x</strong></span></a>
            </div>
            <div className="resume-minimize">
              <a className="resume-minimizebutton" href="#"><span><strong>&ndash;</strong></span></a>
            </div>
            <div className="resume-zoom">
              <a className="resume-zoombutton" href="#"><span><strong>+</strong></span></a>
            </div>
          </div>
          Resume
        </div>
        <div className="resume-content">
          <iframe src="/resume.pdf" title="Resume" style={{ width: '100%', height: '100%' }}></iframe>
        </div>
      </div>
    </div>
  );
};

export default ResumeModel;