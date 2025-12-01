import UsuarioModel from '../models/Usuario';

class UsuarioController {
    currentUser = null;
    async registrarUsuario(nombre, email, telefono, password, confirmPassword) {
        if (!nombre || !email || !telefono || !password || !confirmPassword) {
            return { success: false, error: 'Por favor, complete todos los campos.' };
        }
        if (password !== confirmPassword) {
            return { success: false, error: 'Las contraseñas no coinciden.' };
        }
        if (!email.includes('@') || !email.includes('.com')) {
            return { success: false, error: 'Por favor, ingrese un email válido.' };
        }

        const telefonoLimpio = telefono.trim();
        if (telefonoLimpio.length !== 10 || isNaN(telefonoLimpio)) {
            return { success: false, error: 'Por favor, ingrese un número de teléfono válido de 10 dígitos.' };
        }

        const resultado = await UsuarioModel.create(nombre, email, telefonoLimpio, password);
        if (resultado.success) {
            return { success: true, message: '¡Registro exitoso! Ya puedes iniciar sesión.' };
        } else {
            const errorText = resultado.error.message.includes('UNIQUE constraint failed')
                ? 'El email o teléfono ya están registrados.'
                : 'Error desconocido en la base de datos.';
            return { success: false, error: errorText };
        }
    }
    
    async iniciarSesion(email, password) {
        if (!email || !password) {
            return { success: false, error: 'Ingrese su correo y contraseña.' };
        }
        const resultado = await UsuarioModel.login(email, password);
        if (resultado.success) {
            this.currentUser = resultado.user;
            return { success: true, user: resultado.user };
        } else {
            return { success: false, error: resultado.error || 'Credenciales incorrectas.' };
        }
    }
    getCurrentUser(){
        return this.currentUser;
    }
    logout() {
        this.currentUser= null;
    }
}

export default new UsuarioController();