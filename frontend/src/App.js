import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <form onSubmit={handleSubmit}>
      <div>Feedback</div>
      <input
        type="text"
        name="feedback"
        onChange={(e) => setUserFeedback(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
