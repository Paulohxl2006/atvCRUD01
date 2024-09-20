const cadastro = document.getElementById('cadastro');

let nome = document.getElementById('nome');
let idade = document.getElementById('idade');  
let valor = document.getElementById('valor');
let porte = document.getElementById('porte'); 
let descricao = document.getElementById('descricao');  
let img_prod = document.getElementById('img_prod');

cadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const carregarDados = new FormData();

    carregarDados.append('nome', nome.value);
    carregarDados.append('idade', idade.value); 
    carregarDados.append('valor', valor.value);
    carregarDados.append('porte', porte.value); 
    carregarDados.append('descricao', descricao.value); 
    carregarDados.append('img_prod', img_prod.files[0]);

    await fetch('/api/paginas', {
        method: 'POST',
        body: carregarDados,
    });

    window.location.href = '/admin';

});
