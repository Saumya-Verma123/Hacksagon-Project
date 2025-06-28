import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Solution from './Solution'; 

const ScanResult = () => {
  const location = useLocation();
  const result = location.state;
  const [insights, setInsights] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [error, setError] = useState('');

  const annotatedImageUrl = result?.annotated_image ? `http://localhost:5000${result.annotated_image}` : null;

  useEffect(() => {
    const fetchInsights = async () => {
      if (!result?.detected_objects) {
        setLoadingInsights(false);
        setError("No detected objects available.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/gemini-insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detected_objects: result.detected_objects }),
        });

        const data = await response.json();
        if (response.ok) {
          setInsights(data.insights);
        } else {
          setError(data.error || "Failed to fetch insights.");
        }
      } catch (err) {
        setError("An error occurred while fetching insights.");
        console.error(err);
      } finally {
        setLoadingInsights(false);
      }
    };

    fetchInsights();
  }, [result]);

  return (
    
    <div className="text-center mt-6 mx-auto w-[70%] bg-white pt-4">
      {/* <h3 className="text-lg font-semibold mb-4">Annotated Image</h3> */}
      {annotatedImageUrl ? (
        <img className='width-[700px] h-[550px] mx-auto'
          src={annotatedImageUrl}
          alt="Annotated"
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      ) : (
        <p>No annotated image available.</p>
      )}

      {/* Insights Section */}
      {loadingInsights ? (
        <p className="mt-6">Loading material insights...</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : (
        <Solution insights={insights} />
      )}
    </div>
  
  );
};

export default ScanResult;
