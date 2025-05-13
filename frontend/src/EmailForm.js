import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        email,
        subject,
        message,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Error sending email');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default EmailForm;
