import React, { useEffect, useState } from "react";

function ProgressBar({
  progress,
  max = 5,
  type = "rating",
}) {
  const [animatedProgress, setAnimatedProgress] = useState(
    {}
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const renderBar = (label, rawValue, percentage) => {
    // const percent = ((rawValue / max) * 100).toFixed(1);
    return (
      <div key={label}>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-700">
            {label}
          </span>
          <span className="text-sm text-gray-700">
            {type === "rating" ? `${rawValue}%` : rawValue}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${type == "rating" ? rawValue : percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {type === "rating"
        ? [5, 4, 3, 2, 1].map((rating) =>
            renderBar(
              `${rating} Stars`,
              animatedProgress?.[rating] || 0
            )
          )
        : Object.entries(animatedProgress).map(
            ([label, value]) => renderBar(label, value, Math.round((value/5)*100))
          )}
    </div>
  );
}

export default ProgressBar;
