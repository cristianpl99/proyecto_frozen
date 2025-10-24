import React, { useState, useContext } from 'react';
import './MaterialForm.css';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';

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
                        <h2>Sugerencia</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="material-form-group">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength="30"
                            required
                            placeholder=" "
                        />
                        <label htmlFor="title">Título (máx. 30 caracteres)</label>
                    </div>
                    <div className="material-form-group">
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength="200"
                            required
                            placeholder=" "
                        />
                        <label htmlFor="description">Descripción (máx. 200 caracteres)</label>
                    </div>
                    <button type="submit" className="submit-button material-submit-button">
                        Enviar Sugerencia
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SuggestionForm;