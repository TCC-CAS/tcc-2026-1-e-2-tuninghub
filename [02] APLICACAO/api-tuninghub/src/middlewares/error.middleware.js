// Tratamento de Erro Centralizado
export const errorHandler = (err, req, res, next) => {
  console.error(`[Erro Crítico] ${err.message}`);
  
  // Resposta padrão
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro Interno do Servidor';

  res.status(statusCode).json({
    status: 'error',
    message: message
  });
};