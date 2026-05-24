import EnderecoRepository from '../repositories/endereco.repository.js';

class EnderecoService {
    async obterEndereco(idOficina) {
        if (!idOficina) throw new Error('Id da oficina é obrigatório.');
        return await EnderecoRepository.findByOficina(idOficina);
    }

    async salvarEndereco(idOficina, dados) {
        if (!idOficina) throw new Error('Id da oficina é obrigatório.');

        // Validação básica de campos obrigatórios para o mapa
        const { rua, cidade, estado, cep } = dados;
        if (!rua || !cidade || !estado || !cep) {
            throw new Error('Rua, Cidade, Estado e CEP são obrigatórios para localização.');
        }

        const enderecoExistente = await EnderecoRepository.findByOficina(idOficina);

        if (enderecoExistente) {
            await EnderecoRepository.update(idOficina, dados);
            return { message: 'Endereço atualizado com sucesso.', idOficina };
        } else {
            const novoId = await EnderecoRepository.create({ idOficina, ...dados });
            return { message: 'Endereço cadastrado com sucesso.', idEndereco: novoId };
        }
    }
}

export default new EnderecoService();