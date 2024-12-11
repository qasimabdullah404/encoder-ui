import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const API_ENDPOINT = import.meta.env.VITE_API_URL;
  const [encodeInput, setEncodeInput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [encodedData, setEncodedData] = useState(null);
  const [decodedData, setDecodedData] = useState(null);
  const [encodeError, setEncodeError] = useState(null)
  const [decodeError, setDecodeError] = useState(null)
  const [error, setError] = useState(null);

  const handleEncode = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/encode/${encodeInput}`);
      setEncodedData(response.data.data);
      setEncodeError(response.data.error)
    } catch (error) {
      setError(error);
    }
  };

  const handleDecode = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/decode/${decodeInput}`);
      setDecodedData(response.data.data);
      setDecodeError(response.data.error)
    } catch (error) {
      console.log(error)
      setError(error);
    }
  };

  return (
    <div>
      <div>
        <label>Encode:</label>
        <input type="text" value={encodeInput} onChange={(e) => setEncodeInput(e.target.value)} />
        <button onClick={handleEncode}>Encode</button>
        {encodedData && <p>Encoded Data: {encodedData}</p>}
      </div>

      <div>
        <label>Decode:</label>
        <input type="text" value={decodeInput} onChange={(e) => setDecodeInput(e.target.value)} />
        <button onClick={handleDecode}>Decode</button>
        {decodedData && <p>Decoded Data: {decodedData}</p>}
      </div>

      {decodeError && <p>Error: {decodeError}</p>}
    </div>
  );
}

export default MyComponent;