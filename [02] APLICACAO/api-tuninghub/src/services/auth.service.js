import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioRepository from '../repositories/usuario.repository.js';
import oficinaRepository from '../repositories/oficina.repository.js';
import adminRepository from '../repositories/admin.repository.js';

const JWT_SECRET = process.env.JWT_SECRET

class AuthService {
  async autenticar(email, senha, tipoConta) {
    let usuarioEncontrado = null;
    let payloadRole = '';

    // 1. Orquestração baseada no tipo de conta solicitado
    switch (tipoConta) {
      case 'usuario':
        usuarioEncontrado = await usuarioRepository.findByEmail(email);
        payloadRole = 'USUARIO';
        break;
      case 'oficina':
        usuarioEncontrado = await oficinaRepository.findByEmail(email);
        payloadRole = 'OFICINA';
        break;
      case 'admin':
        usuarioEncontrado = await adminRepository.findByEmail(email);
        payloadRole = 'ADMIN';
        break;
      default:
        throw new Error('TIPO_CONTA_INVALIDO');
    }

    // 2. Validação genérica de existência (evita enumeração de usuários)
    if (!usuarioEncontrado || !usuarioEncontrado.Ativo) {
      throw new Error('CREDENCIAIS_INVALIDAS');
    }

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.Senha);
    if (!senhaValida) {
      throw new Error('CREDENCIAIS_INVALIDAS');
    }

    // 4. Geração do Token (JWT) com os dados não-sensíveis
    // Padronizando o ID no payload independentemente da tabela original
    const idIdentificador =
      usuarioEncontrado.IdUsuario ||
      usuarioEncontrado.IdOficina ||
      usuarioEncontrado.IdAdmin;

    const token = jwt.sign(
      { id: idIdentificador, role: payloadRole, email: usuarioEncontrado.Email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // Tempo de vida do token
    );

    return {
      token,
      usuario: {
        id: idIdentificador,
        nome: usuarioEncontrado.Nome || usuarioEncontrado.NomeOficina,
        email: usuarioEncontrado.Email,
        role: payloadRole
      }
    };
  }
}

export default new AuthService();