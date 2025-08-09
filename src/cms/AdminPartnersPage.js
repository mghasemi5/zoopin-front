// src/pages/AdminPartnersPage.js
import React, { useState } from 'react';
import './AdminPartnersPage.css';
import initialPartners from '../data/partners';

function AdminPartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [form, setForm] = useState({ name: '', slug: '', tagline: '', bio: '', email: '', website: '', phone: '', image: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...partners];
      updated[editIndex] = form;
      setPartners(updated);
      setEditIndex(null);
    } else {
      setPartners([...partners, form]);
    }
    setForm({ name: '', slug: '', tagline: '', bio: '', email: '', website: '', phone: '', image: '' });
  };

  const handleEdit = (index) => {
    setForm(partners[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = partners.filter((_, i) => i !== index);
    setPartners(updated);
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className="admin-page">
      <h1>Manage Partners</h1>
      <form className="partner-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="slug" placeholder="Slug (unique)" value={form.slug} onChange={handleChange} required />
        <input name="tagline" placeholder="Tagline" value={form.tagline} onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} rows={3} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? 'Update Partner' : 'Add Partner'}</button>
      </form>

      <div className="partner-list">
        {partners.map((partner, i) => (
          <div className="partner-item" key={i}>
            <img src={partner.image} alt={partner.name} />
            <div>
              <h3>{partner.name}</h3>
              <p><small>{partner.slug}</small></p>
              <p>{partner.tagline}</p>
              <button onClick={() => handleEdit(i)}>✏️ Edit</button>
              <button onClick={() => handleDelete(i)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPartnersPage;
