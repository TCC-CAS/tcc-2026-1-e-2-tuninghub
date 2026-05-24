import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'Token não fornecido.' });
  }

  // Separa a palavra "Bearer" do token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioLogado = decoded;
    return next(); 
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Token inválido ou expirado.' });
  }
};