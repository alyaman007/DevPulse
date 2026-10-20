import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const API_URL = 'http://localhost:5000/api/tickets';

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) setTickets(res.data);
    } catch (err) {
      console.error('Backend connection error:', err);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title, priority });
      setTitle('');
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Open' ? 'Resolved' : 'Open';
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>DevPulse</h1>
        <p>Agile Sprint & Issue Tracker</p>
      </header>

      <form onSubmit={handleCreateTicket} className="ticket-form">
        <input
          type="text"
          placeholder="Enter ticket title or bug description..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button type="submit" className="btn-submit">Create Ticket</button>
      </form>

      <div className="tickets-grid">
        {tickets.length === 0 ? (
          <p className="no-tickets">No tickets available. Add a new ticket to get started!</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className={`ticket-card ${ticket.status ? ticket.status.toLowerCase() : 'open'}`}>
              <div className="card-header">
                <span className="status-text">{ticket.status}</span>
                <span className={`priority-badge ${ticket.priority ? ticket.priority.toLowerCase() : 'medium'}`}>
                  {ticket.priority}
                </span>
              </div>
              <h3>{ticket.title}</h3>
              <div className="card-actions">
                <button 
                  onClick={() => toggleStatus(ticket.id, ticket.status)}
                  className="btn-status"
                >
                  {ticket.status === 'Open' ? 'Resolve' : 'Reopen'}
                </button>
                <button onClick={() => handleDelete(ticket.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;