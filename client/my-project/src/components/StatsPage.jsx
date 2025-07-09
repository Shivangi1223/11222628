// import { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import api from "../api";
// import { logger } from "../utils/logger";

// const StatsPage = () => {
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       logger("Fetching shortened URL statistics...");
//       try {
//         const res = await api.get("/stats");
//         setUrls(res.data.data);
//         logger(`Loaded ${res.data.data.length} records.`);
//       } catch (err) {
//         logger("Failed to load stats.");
//         console.error("Failed to load stats", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" mt={4} mb={2}>
//         Shortened URL Statistics
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : urls.length === 0 ? (
//         <Typography align="center">No URLs found.</Typography>
//       ) : (
//         urls.map((url, index) => (
//           <Paper key={index} sx={{ p: 2, mb: 2 }}>
//             <Typography>
//               <strong>Short URL:</strong>{" "}
//               <a href={`/r/${url.shortcode}`} target="_blank" rel="noreferrer">
//                 {window.location.origin}/r/{url.shortcode}
//               </a>
//             </Typography>
//             <Typography><strong>Original URL:</strong> {url.longUrl}</Typography>
//             <Typography><strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}</Typography>
//             {url.clicks !== undefined && (
//               <Typography><strong>Total Clicks:</strong> {url.clicks}</Typography>
//             )}
//           </Paper>
//         ))
//       )}
//     </Container>
//   );
// };

// export default StatsPage;


import { useEffect, useState } from "react";
import api from "../api";
import "./StatsPage.css";

const StatsPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        setUrls(res.data.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-container">
      <div className="stats-heading">Shortened URL Statistics</div>

      {loading ? (
        <div className="loading-box">
          <span>Loading...</span>
        </div>
      ) : urls.length === 0 ? (
        <div className="no-url-text">No URLs found.</div>
      ) : (
        urls.map((url, index) => (
          <div key={index} className="url-card">
            <p>
              <span className="url-label">Short URL:</span>
              <a href={`/r/${url.shortcode}`} target="_blank" rel="noreferrer">
                {window.location.origin}/r/{url.shortcode}
              </a>
            </p>
            <p>
              <span className="url-label">Original URL:</span>
              {url.longUrl}
            </p>
            <p>
              <span className="url-label">Expires At:</span>
              {new Date(url.expiresAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsPage;
