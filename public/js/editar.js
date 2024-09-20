const form_edit = document.getElementById('editar_cachorro');
const url = new URLSearchParams(window.location.search);

const id_url = url.get('id');

let id = document.getElementById('id_edit');
let nome = document.getElementById('nome');
let idade = document.getElementById('idade');  
let valor = document.getElementById('valor');
let porte = document.getElementById('porte'); 
let descricao = document.getElementById('descricao');  
let img_prod = document.getElementById('img_prod');

document.addEventListener('DOMContentLoaded', async () => { 
   

    const response = await fetch('api/paginas');
    const cachorros = await response.json();
    const cachorro = cachorros.find(cachorro => cachorro.id == id_url);
alert(cachorro.id);

    if (cachorro) {
        id.value = cachorro.id;
        nome.value = cachorro.nome;
        idade.value = cachorro.idade;
        porte.value = cachorro.porte;
        valor.value = cachorro.valor;
        descricao.value = cachorro.descricao; 
        
    } else {
        alert("Cachorro não encontrado!!");
    
        window.location.href = '/listar';
    }

});

form_edit.addEventListener('submit', async (e) => {
   
    e.preventDefault();

    const att_dados = new FormData();

 
    att_dados.append('nome', nome.value);
    att_dados.append('idade', idade.value);
    att_dados.append('valor', valor.value);
    att_dados.append('porte', porte.value);
    att_dados.append('descricao', descricao.value);

    
    // Caso seja adicionado uma nova imagem
    if (img_prod.files.length > 0) {
        att_dados.append('img_prod', img_prod.files[0]);
    }
    await fetch(`/api/paginas/${id.value}`, {
        method: 'PUT',
        body: att_dados,
    });

    alert("cachorro alterado com sucesso!!");
    window.location.href = '/listar';

});