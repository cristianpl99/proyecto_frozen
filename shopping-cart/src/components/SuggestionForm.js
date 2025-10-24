import React, { useState, useContext } from 'react';
import './ComplaintSuggestionForm.css';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';

const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const SuggestionForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addToast } = useContext(ToastContext);
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            addToast('El título y la descripción son obligatorios', 'error');
            return;
        }

        try {
            const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/sugerencias/', {
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
                addToast('Sugerencia enviada exitosamente', 'success');
                onClose();
            } else {
                addToast('Error al enviar la sugerencia', 'error');
            }
        } catch (error) {
            addToast('Error de red al enviar la sugerencia', 'error');
        }
    };

    return (
        <div className="register-form-overlay">
            <div className="register-form-container">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="form-title">
                    <img src="/favicon_ice.png" alt="logo" className="form-logo"/>
                    <div>
                        <h2>Hacer Sugerencia</h2>
                    </div>
                </div>
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
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SuggestionForm;