import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const verificarToken = (rolesPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Token não fornecido ou formato inválido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Valida se a "role" contida no token está na lista de "roles" permitidas para a rota
      if (rolesPermitidos && !rolesPermitidos.includes(decoded.role)) {
        return res.status(403).json({ erro: 'Acesso negado. Nível de permissão insuficiente.' });
      }

      // Injeta os dados do usuário no Request para os próximos middlewares/controllers
      req.user = decoded;
      return next();

    } catch (error) {
      return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
  };
};

// Como usar nas rotas:
// import { verificarToken } from '../middlewares/auth.middleware.js';
// router.post('/projeto', verificarToken(['USUARIO']), projetoController.criar);
// router.put('/oficina/servico', verificarToken(['OFICINA', 'ADMIN']), servicoController.atualizar);