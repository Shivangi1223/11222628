import { useState } from "react";
import api from "../api";
import "./ShortenerForm.css"; // <-- Import here

const MAX_URLS = 5;

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", customCode: "" }]);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { longUrl: "", validity: "", customCode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const newErrors = [];

    const validData = urls.filter((url, i) => {
      try {
        if (!url.longUrl) throw "Long URL is required.";
        if (!/^https?:\/\/.+/.test(url.longUrl)) throw "Invalid URL format.";
        if (url.validity && isNaN(Number(url.validity))) throw "Invalid validity.";
        if (url.customCode && !/^[a-zA-Z0-9_-]+$/.test(url.customCode))
          throw "Shortcode must be alphanumeric.";
        return true;
      } catch (err) {
        newErrors[i] = err;
        return false;
      }
    });

    setErrors(newErrors);

    try {
      const res = await api.post("/shorten", { urls });
      setResults(res.data.data);
    } catch (err) {
      console.error("Submit failed", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-heading">URL Shortener</div>

      {urls.map((url, index) => (
        <div key={index} className="url-card">
          <h3>URL #{index + 1}</h3>
          <div className="input-row">
            <input
              type="text"
              placeholder="Long URL"
              value={url.longUrl}
              onChange={(e) => handleChange(index, "longUrl", e.target.value)}
            />
            <input
              type="text"
              placeholder="Validity (minutes)"
              value={url.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
            <input
              type="text"
              placeholder="Custom Shortcode"
              value={url.customCode}
              onChange={(e) => handleChange(index, "customCode", e.target.value)}
            />
          </div>
          {errors[index] && <p style={{ color: "red", marginTop: "6px" }}>{errors[index]}</p>}
        </div>
      ))}

      <div className="button-row">
        <button className="add-btn" onClick={handleAdd} disabled={urls.length >= MAX_URLS}>
          + ADD MORE
        </button>
        <button className="generate-btn" onClick={handleSubmit}>
          GENERATE SHORT URLS
        </button>
      </div>

      {results.length > 0 && (
        <div className="result-box">
          <h3>Shortened URLs</h3>
          {results.map((res, index) => (
            <div key={index} className="result-card">
              <p><strong>Short URL:</strong> <a href={`/r/${res.shortcode}`} target="_blank" rel="noreferrer">{window.location.origin}/r/{res.shortcode}</a></p>
              <p><strong>Original:</strong> {res.longUrl}</p>
              <p><strong>Expires At:</strong> {new Date(res.expiresAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;



