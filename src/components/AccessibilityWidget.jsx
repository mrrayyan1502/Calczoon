import React, { useState, useEffect, useRef } from 'react';
import { Accessibility, X } from 'lucide-react';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // Toggle Panel Open/Close
  const togglePanel = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close Panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Sync contrast mode with body class list
  useEffect(() => {
    if (contrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [contrast]);

  // Sync dyslexic mode with body class list
  useEffect(() => {
    if (dyslexic) {
      document.body.classList.add('dyslexic-friendly');
    } else {
      document.body.classList.remove('dyslexic-friendly');
    }
  }, [dyslexic]);

  // Sync font size scaling
  useEffect(() => {
    if (fontSizeScale === 1.0) {
      document.body.style.fontSize = '';
    } else {
      document.body.style.fontSize = `${fontSizeScale}rem`;
    }
  }, [fontSizeScale]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={btnRef}
        onClick={togglePanel}
        className="accessibility-widget-btn"
        aria-label="Open Accessibility Tools"
        type="button"
      >
        <Accessibility size={24} />
      </button>

      {/* Accessibility Adjustment Panel */}
      {isOpen && (
        <div ref={panelRef} className="accessibility-panel" role="dialog" aria-label="Accessibility panel">
          <div className="acc-panel-header">
            <h3 className="text-sm font-bold tracking-wider uppercase m-0">Accessibility Tools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close Accessibility Tools"
              type="button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <X size={18} />
            </button>
          </div>
          <div className="acc-panel-body">
            {/* Font Resizing Row */}
            <div className="acc-tool-row">
              <span>Text Size:</span>
              <div className="btn-acc-group">
                <button
                  onClick={() => fontSizeScale > 0.8 && setFontSizeScale(prev => parseFloat((prev - 0.1).toFixed(1)))}
                  className="btn-acc-small"
                  aria-label="Decrease text size"
                  type="button"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeScale(1.0)}
                  className="btn-acc-small"
                  aria-label="Reset text size"
                  type="button"
                >
                  Reset
                </button>
                <button
                  onClick={() => fontSizeScale < 1.4 && setFontSizeScale(prev => parseFloat((prev + 0.1).toFixed(1)))}
                  className="btn-acc-small"
                  aria-label="Increase text size"
                  type="button"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Contrast Toggle Row */}
            <div className="acc-tool-row">
              <span>Contrast:</span>
              <button
                onClick={() => setContrast(!contrast)}
                className={`btn-acc-full ${contrast ? 'bg-emerald-600 border-emerald-500' : ''}`}
                type="button"
              >
                {contrast ? 'Disable High Contrast' : 'Enable High Contrast'}
              </button>
            </div>

            {/* Dyslexic Friendly Font Toggle Row */}
            <div className="acc-tool-row">
              <span>Font Style:</span>
              <button
                onClick={() => setDyslexic(!dyslexic)}
                className={`btn-acc-full ${dyslexic ? 'bg-emerald-600 border-emerald-500' : ''}`}
                type="button"
              >
                {dyslexic ? 'Use Standard Font' : 'Use Dyslexic Font'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
