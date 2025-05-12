
import React,{useEffect, useState} from "react";


function ProgressBar({ progress , max = 5 }) {
    const [animatedProgress, setAnimatedProgress] = useState({});

    useEffect(()=>{
        const timer = setTimeout(() => {
            setAnimatedProgress(progress)
        }, 100);
        return () => clearTimeout(timer)
    },[progress])

  return (
    <div className="space-y-2 p-4">
      {[5, 4, 3, 2, 1].map((rating) => {
        const percent = animatedProgress?.[rating] || 0;
        return (
          <div key={rating}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700">{rating} Stars</span>
              <span className="text-sm text-gray-700">{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
