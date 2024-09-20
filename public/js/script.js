const listarPTable = document.getElementById('listarProdutos');

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('/api/paginas/');
    const cachorros = await response.json();
    listarcachorro(cachorros); 

});

const listarcachorro = (cachorro) => {

    listarPTable.innerHTML = '';
    cachorro.forEach(cachorro => {
        const tr = document.createElement('tr');

        const td_id = document.createElement('td');
        td_id.textContent = cachorro.id;
        tr.appendChild(td_id);

        const td_nome = document.createElement('td');
        td_nome.textContent = cachorro.nome;
        tr.appendChild(td_nome);

        const td_idade = document.createElement('td');
        td_idade.textContent = cachorro.idade;
        tr.appendChild(td_idade);

        const td_porte = document.createElement('td');
        td_porte.textContent = cachorro.porte;
        td_porte.classList.add('text-center');
        tr.appendChild(td_porte);

        const td_valor = document.createElement('td');
        td_valor.textContent = `R$ ${cachorro.valor}`;
        tr.appendChild(td_valor);

  

        const td_img = document.createElement('td');
        if (cachorro.img) {
            const img = document.createElement('img');
            img.src = cachorro.img;
            img.alt = cachorro.nome;
            img.width = 100; // Definindo o tamanho da imagem
            td_img.appendChild(img);
        }
        tr.appendChild(td_img);

        const td_acao = document.createElement('td');
        let btnEditar = document.createElement('a');
        btnEditar.classList.add('btn', 'btn-warning', 'me-3');
        btnEditar.href = `editar.html?id=${cachorro.id}`;
        btnEditar.textContent = 'EDITAR';
        td_acao.appendChild(btnEditar);

        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-danger', 'me-3');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.dataset.id = cachorro.id;
        btnExcluir.dataset.name = cachorro.nome;
        td_acao.appendChild(btnExcluir);
        td_acao.classList.add('text-center');


        tr.appendChild(td_acao);

        listarPTable.appendChild(tr);

    });

};

const delProduto = async (id) => {
    await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    alert("Produto excluído com Sucesso!!");

   window.location.href="/listar";
};

document.addEventListener('click', (e) => {
    let result = e.target.classList.contains('btn-danger');
    if (result) {
       const id_ex = e.target.getAttribute('data-id');
       const nome_ex = e.target.getAttribute('data-name');
       let ok = confirm(`Tem certeza que deseja excluir o produto: ${nome_ex}?`);
       if (ok) {
        delProduto(id_ex);
       } else {
        window.location.href="/listar";
       }      
    }
    
});