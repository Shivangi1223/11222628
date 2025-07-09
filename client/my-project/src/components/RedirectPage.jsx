import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./RedirectPage.css";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await api.get(`/redirect/${shortcode}`);
        const longUrl = res?.data?.longUrl;

        if (longUrl) {
          setTimeout(() => {
            window.location.href = longUrl;
          }, 2000);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchAndRedirect();
  }, [shortcode]);

  return (
    <div className="redirect-container">
      <div className="redirect-box">
        {error ? (
          <>
            <div className="redirect-title" style={{ color: "red" }}>
              Invalid or Expired Link
            </div>
            <div className="redirect-subtext">
              Please check your link and try again.
            </div>
          </>
        ) : (
          <>
            <div className="redirect-title">Redirecting...</div>
            <div className="redirect-subtext">Hang tight! Taking you to your destination.</div>
            <div className="spinner"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
