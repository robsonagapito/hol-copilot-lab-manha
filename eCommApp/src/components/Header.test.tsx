import userEvent from '@testing-library/user-event';
import { render, screen } from '../test/test-utils';
import Header from './Header';

describe('Header', () => {
    it('opens the contact modal, submits the form, and clears the fields', async () => {
        const user = userEvent.setup();

        render(<Header />);

        await user.click(screen.getByRole('button', { name: 'Fale Conosco' }));

        const nameInput = screen.getByPlaceholderText('Seu nome') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Seu e-mail') as HTMLInputElement;
        const messageInput = screen.getByPlaceholderText('Sua mensagem') as HTMLTextAreaElement;

        await user.type(nameInput, 'Maria');
        await user.type(emailInput, 'maria@example.com');
        await user.type(messageInput, 'Gostaria de mais informações.');
        await user.click(screen.getByRole('button', { name: 'Enviar' }));

        expect(screen.getByText('Obrigado pela sua mensagem')).toBeInTheDocument();
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');

        await user.click(screen.getByRole('button', { name: 'Continuar' }));

        expect(screen.queryByText('Obrigado pela sua mensagem')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Fale Conosco' })).toBeInTheDocument();
    });
});
