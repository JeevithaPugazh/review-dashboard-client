import React, { useState } from "react";

function Service(props) {
  return (
    <div>
      ✔️ <span>{props.service}</span>
    </div>
  );
}

function Password(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        placeholder={props.placeholder || "password1"}
        required
      />
      <span
        className="absolute right-3 top-3 cursor-pointer text-secondary"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <span className="material-symbols-outlined">
            visibility
          </span>
        ) : (
          <span className="material-symbols-outlined">
            lock
          </span>
        )}
      </span>
    </div>
  );
}

export default Password;
