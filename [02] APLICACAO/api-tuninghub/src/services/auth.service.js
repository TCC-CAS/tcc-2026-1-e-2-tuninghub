import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuario.repository.js';

class AuthService {
  async loginUsuario(email, senhaPlain) {
    // 1. Busca o usuário pelo e-mail
    const usuario = await UsuarioRepository.findByEmail(email);
    
    // Mensagem genérica para não revelar se o e-mail existe na base
    if (!usuario) {
      throw new Error('E-mail ou senha inválidos.'); 
    }

    // 2. Compara a senha digitada com a criptografada no banco
    const senhaValida = await bcrypt.compare(senhaPlain, usuario.Senha);
    if (!senhaValida) {
      throw new Error('E-mail ou senha inválidos.');
    }

    // 3. Monta o Payload (o que vai dentro do token)
    // ATENÇÃO: Nunca coloque dados sensíveis (como senha ou CPF) no payload do JWT!
    const payload = {
      id: usuario.IdUsuario,
      email: usuario.Email,
      role: 'CLIENTE' // Identificador útil para futuras verificações de permissão
    };

    // 4. Gera o Token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // 5. Retorna os dados do usuário (sem a senha) e o token
    const { Senha, ...dadosUsuario } = usuario;
    
    return {
      usuario: dadosUsuario,
      token
    };
  }
}

export default new AuthService();