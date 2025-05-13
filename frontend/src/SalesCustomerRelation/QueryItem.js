import React, { useState } from 'react';
import { Card, Button, Form, Collapse } from 'react-bootstrap';

function QueryItem({ query, replyToQuery }) {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState('');

  const handleReply = () => {
    if (reply.trim()) {
      replyToQuery(query._id, reply);  // Pass the correct query ID
      setReply('');  // Clear reply input after sending
      setOpen(false); // Close the reply form
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>{query.name}</h6>
        <p>{query.query}</p>
        <p><strong>Status:</strong> {query.status}</p> {/* Display status */}
        
        {query.status === 'solved' && query.replyMessage ? (
          <p><strong>Reply:</strong> {query.replyMessage}</p> // Show reply if query is solved
        ) : (
          <>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setOpen(!open)}
              aria-controls={`reply-form-${query._id}`}
              aria-expanded={open}
            >
              Reply
            </Button>
            <Collapse in={open}>
              <div id={`reply-form-${query._id}`} className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply here..."
                />
                <Button className="mt-2" size="sm" onClick={handleReply}>
                  Send Reply
                </Button>
              </div>
            </Collapse>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default QueryItem;
