import { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Load messages from localStorage when the app starts
  useEffect(() => {
    try {
      const stored = localStorage.getItem('messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch {
      setError('Could not load your messages.');
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  function handleCreate(name, content) {
    const newMessage = {
      _id: Date.now(), // simple unique ID
      name,
      content,
    };
    setMessages((prev) => [newMessage, ...prev]);
  }

  function handleDelete(id) {
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Unsent</h1>
        <p className="app-tagline">
          When you're ready, this space is here for you —<br />
          your words are safe and only yours.
        </p>
      </header>

      <main className="app-main">
        <MessageForm onSubmit={handleCreate} />
        {error && <p className="app-error">{error}</p>}
        {messages.length === 0 ? (
          <p className="app-loading">No messages yet. Start typing!</p>
        ) : (
          <MessageList messages={messages} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}