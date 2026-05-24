import EnderecoService from '../services/endereco.service.js';

class EnderecoController {
    async buscar(req, res, next) {
        try {
            const { idOficina } = req.params;
            const endereco = await EnderecoService.obterEndereco(idOficina);

            if (!endereco) {
                return res.status(404).json({ status: 'error', message: 'Endereço não encontrado para esta oficina.' });
            }

            res.status(200).json(endereco);
        } catch (error) {
            next(error);
        }
    }

    async salvar(req, res, next) {
        try {
            // Em uma rota protegida, poderíamos pegar o idOficina direto do Token (req.usuarioLogado.id)
            const { idOficina } = req.params;
            const resultado = await EnderecoService.salvarEndereco(idOficina, req.body);

            res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes('obrigatório')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new EnderecoController();