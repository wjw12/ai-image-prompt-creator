'use client'
import React, { useState, useEffect, useRef } from "react";
import promptConfig from '/public/promptConfig.json';

const AIImagePromptCreator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    promptConfig.templates[0]
  );
  const [prompt, setPrompt] = useState([]);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [copiedMessage, setCopiedMessage] = useState("");
  const [copiedLink, setCopiedLink] = useState("");
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const letters = document.querySelectorAll('.animated-letter');
    letters.forEach((letter, index) => {
      letter.style.setProperty('--i', index);
    });
  }, []);

  useEffect(() => {
    parseTemplate(selectedTemplate.template);
  }, [selectedTemplate]);

  useEffect(() => {
    if (focusedCategory && promptConfig.categories[focusedCategory]) {
      setSuggestions(promptConfig.categories[focusedCategory]);
    } else {
      setSuggestions([]);
    }
  }, [focusedCategory]);

  const parseTemplate = (template) => {
    const parts = template.split(/(\[[^\]]+\])/);
    const newPrompt = parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const [category, defaultValue] = part.slice(1, -1).split(",");
        return {
          id: `cat${index}`,
          text: defaultValue ? defaultValue.split("=")[1] : "",
          category: category,
          fixed: false,
        };
      } else {
        return { id: `fixed${index}`, text: part, fixed: true };
      }
    });
    setPrompt(newPrompt);
  };

  const handleTemplateChange = (e) => {
    const newTemplate = promptConfig.templates.find(
      (t) => t.id === e.target.value
    );
    setSelectedTemplate(newTemplate);
    setCopiedMessage("");
    setCopiedLink("");
  };

  const handleCategoryFocus = (category) => {
    setFocusedCategory(category);
  };

  const handleCategoryChange = (id, newText) => {
    setPrompt(
      prompt.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
    setCopiedMessage("");
  };

  const handleSuggestionClick = (suggestion) => {
    const focusedItem = prompt.find(
      (item) => item.category === focusedCategory
    );
    if (focusedItem) {
      handleCategoryChange(focusedItem.id, suggestion);
    }
  };

  const handleRandomize = () => {
    if (promptConfig.categories[focusedCategory]) {
      const newSuggestions = [...promptConfig.categories[focusedCategory]];
      for (let i = newSuggestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newSuggestions[i], newSuggestions[j]] = [
          newSuggestions[j],
          newSuggestions[i],
        ];
      }
      setSuggestions(newSuggestions);
    }
  };

  const handleCopyPrompt = () => {
    const fullPrompt = prompt.map((item) => item.text).join("");
    navigator.clipboard
      .writeText(fullPrompt)
      .then(() => {
        const modelUrl = `https://imagine.heurist.ai/models/${selectedTemplate.recommendedModel.replace(
          /\s+/g,
          ""
        )}`;
        setCopiedMessage("Prompt copied! Generate image at:");
        setCopiedLink(modelUrl);
      })
      .catch((err) => {
        console.error("Failed to copy prompt: ", err);
        setCopiedMessage("Failed to copy prompt. Please try again.");
      });
  };

  return (
    <div className="ai-image-prompt-creator">
      <h1 className="title">
        {"AI Prompt Generator".split('').map((letter, index) => (
            <span key={index} className="animated-letter">
            {letter === ' ' ? '\u00A0' : letter}
            </span>
        ))}
      </h1>
      <select onChange={handleTemplateChange} value={selectedTemplate.id}>
        {promptConfig.templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <p>Recommended Model: {selectedTemplate.recommendedModel}</p>
      <div className="prompt-container">
        {prompt.map((item) => (
          <React.Fragment key={item.id}>
            {item.fixed ? (
              <span className="fixed-text">{item.text}</span>
            ) : (
              <span className="category-container">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleCategoryChange(item.id, e.target.value)
                  }
                  onFocus={() => handleCategoryFocus(item.category)}
                  className={`category-input ${item.category}`}
                />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      {focusedCategory && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={`suggestion-btn ${focusedCategory}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
          <button className="randomize-btn" onClick={handleRandomize}>
            🎲
          </button>
        </div>
      )}
      <button className="copy-btn" onClick={handleCopyPrompt}>
        Copy Prompt
      </button>
      {copiedMessage && (
        <p className="copied-message">
          {copiedMessage}{" "}
          {copiedLink && (
            <a href={copiedLink} target="_blank" rel="noopener noreferrer">
              {copiedLink}
            </a>
          )}
        </p>
      )}
      <div className="footer">
        <p>
          Built by{" "}
          <a
            href="https://x.com/artoriatech"
            target="_blank"
            rel="noopener noreferrer"
          >
            JW
          </a>{" "}
          (Founder of{" "}
          <a
            href="https://heurist.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Heurist.ai
          </a>
          )
        </p>
        <p className="cta">
          Join our{" "}
          <a
            href="https://discord.com/invite/heuristai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord community
          </a>{" "}
          to create and share AI art!
        </p>
      </div>
    </div>
    
  );
};

export default AIImagePromptCreator;
