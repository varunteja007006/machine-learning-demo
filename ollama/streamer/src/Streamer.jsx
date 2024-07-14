// src/StreamResponse.js
import React, { useState } from "react";

const StreamResponse = () => {
  const [response, setResponse] = useState("");

  const fetchResponse = async () => {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava:13b",
        prompt: "Why is the sky blue?",
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setResponse((prev) => prev + JSON.parse(chunk)?.response);
    }
  };

  return (
    <div>
      <button onClick={fetchResponse}>Fetch Response</button>
      <p>{response}</p>
    </div>
  );
};

export default StreamResponse;
