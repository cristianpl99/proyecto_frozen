import React, { useState, useContext } from 'react';
import './ComplaintForm.css';
import './ComplaintSuggestionForm.css';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const ComplaintForm = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('new');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previousComplaints, setPreviousComplaints] = useState([]);
    const { addToast } = useContext(ToastContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPreviousComplaints = async () => {
            if (activeTab === 'history') {
                try {
                    const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/reclamos/');
                    const data = await response.json();
                    const userComplaints = data.results.filter(complaint => complaint.id_cliente === user.id_cliente);
                    setPreviousComplaints(userComplaints);
                } catch (error) {
                    addToast('Error al cargar los reclamos anteriores', 'error');
                }
            }
        };

        fetchPreviousComplaints();
    }, [activeTab, user, addToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            addToast('El título y la descripción son obligatorios', 'error');
            return;
        }

        try {
            const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/reclamos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_cliente: user.id_cliente,
                    titulo: title,
                    descripcion: description,
                }),
            });

            if (response.ok) {
                addToast('Reclamo enviado exitosamente', 'success');
                onClose();
            } else {
                addToast('Error al enviar el reclamo', 'error');
            }
        } catch (error) {
            addToast('Error de red al enviar el reclamo', 'error');
        }
    };

    return (
        <div className="register-form-overlay">
            <div className="register-form-container">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="form-title">
                    <img src="/favicon_ice.png" alt="logo" className="form-logo"/>
                    <div>
                        <h2>Reclamo</h2>
                    </div>
                </div>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>Nuevo Reclamo</button>
                    <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Reclamos Anteriores</button>
                </div>
                {activeTab === 'new' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group complaint-form-group">
                            <label htmlFor="title">Título (máx. 30 caracteres)</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength="30"
                                required
                            />
                        </div>
                        <div className="form-group complaint-form-group">
                            <label htmlFor="description">Descripción (máx. 200 caracteres)</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength="200"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            <EnvelopeIcon />
                            Enviar Reclamo
                        </button>
                    </form>
                ) : (
                    <div className="previous-complaints-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Título</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousComplaints.map(complaint => (
                                    <tr key={complaint.id_reclamo}>
                                        <td>{complaint.id_reclamo}</td>
                                        <td>{new Date(complaint.fecha_reclamo).toLocaleDateString('es-ES').replace(/\//g, '-')}</td>
                                        <td>{complaint.titulo}</td>
                                        <td>{complaint.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintForm;