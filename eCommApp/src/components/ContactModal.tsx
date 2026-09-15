import { useState } from 'react';

interface ContactModalProps {
    onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.reset();
        setShowConfirmation(true);
    };

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}>
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-modal-title"
                >
                    <h2 id="contact-modal-title">Fale Conosco</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input type="text" name="name" placeholder="Seu nome" required />
                        <input type="email" name="email" placeholder="Seu e-mail" required />
                        <textarea name="message" placeholder="Sua mensagem" required />
                        <div className="contact-modal-actions">
                            <button type="submit">Enviar</button>
                            <button type="button" onClick={onClose} className="cancel-btn">Fechar</button>
                        </div>
                    </form>
                </div>
            </div>
            {showConfirmation && (
                <div className="modal-backdrop">
                    <div
                        className="modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-confirmation-title"
                    >
                        <h2 id="contact-confirmation-title">Obrigado pela sua mensagem</h2>
                        <div className="contact-modal-actions">
                            <button type="button" onClick={() => setShowConfirmation(false)}>Continuar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactModal;
