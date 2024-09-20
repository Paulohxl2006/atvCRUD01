const listarPtable = document.getElementById("listarcachorro");

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/paginas');
    const cachorros = await response.json();
    listar(cachorros,0);
 
});
const Pesquisar = document.getElementById("formpesquisa");
Pesquisar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/paginas');
    const cachorros = await response.json();
    const pesquisa = document.getElementById("pesquisar").value.toLowerCase();
    const mostra = cachorros.filter(cachorro =>  cachorro.nome.toLowerCase().includes(pesquisa) );
listar(mostra,0);

});



const listar = (cachorros , like) => {
    listarPtable.innerHTML = '';

    cachorros.forEach(cachorro => {
        let article = document.createElement('article');
        article.classList.add('postcard', 'light', 'blue');
        
        // Link da imagem
        let a = document.createElement('a');
        a.classList.add('postcard__img_link');
        a.href = '#';
        
        // Imagem do cachorro
        let img = document.createElement('img');
        img.classList.add('postcard__img');
        img.src = cachorro.img;
        img.alt = cachorro.nome;
        a.appendChild(img);
        
        // Texto dentro do cartão
        let postcardText = document.createElement('div');
        postcardText.classList.add('postcard__text', 't-dark');
        
        // Título do cartão
        let h1 = document.createElement('h1');
        h1.classList.add('postcard__title', 'blue');
        let titleLink = document.createElement('a');
        titleLink.href = '#';
        titleLink.textContent = cachorro.nome;
        h1.appendChild(titleLink);
        postcardText.appendChild(h1);
        
                // Data (substitui por uma data fictícia aqui)
                let subtitle = document.createElement('div');
                subtitle.classList.add('postcard__subtitle', 'small');
                let time = document.createElement('time');
                time.datetime = '2023-09-12 12:00:00';
                time.innerHTML = `<i class="fas fa-calendar-alt mr-2"></i>Vive em media : ${cachorro.idade}`;
                subtitle.appendChild(time);
                postcardText.appendChild(subtitle);

        // Barra
        let postcardBar = document.createElement('div');
        postcardBar.classList.add('postcard__bar');
        postcardText.appendChild(postcardBar);
        
        // Descrição do cachorro
        let descricao = document.createElement('div');
        descricao.classList.add('postcard__preview-txt','text-justify');
        descricao.textContent = cachorro.descricao;
        postcardText.appendChild(descricao);
        
        // Tags
        let tagbox = document.createElement('ul');
        tagbox.classList.add('postcard__tagbox');
        

        
        // Tag valor
        let valorTag = document.createElement('li');
        valorTag.classList.add('tag__item');
        valorTag.innerHTML = `<i class="fas fa-money-bill-wave mr-2"></i><h6>Valor medio: R$ ${cachorro.valor}</h6>`;
        tagbox.appendChild(valorTag);

               // Tag valor
               let valorTa = document.createElement('li');
               valorTa.classList.add('tag__item');
               valorTa.innerHTML = `<i class="fas fa-money-bill-wave mr-2"></i><h6> ${cachorro.porte} porte</h6>`;
               tagbox.appendChild(valorTa);
        
               let Like = document.createElement('li');
               Like.innerHTML = `
               <form id="form${cachorro.id}" value="doido" ><button id="botao${cachorro.id}" value="false" type="submit" onclick="Deulike(${cachorro.id})" > <i   class="bi bi-heart-fill"><h5>${cachorro.like+like} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg></h5></i></button> </form>`;
               tagbox.appendChild(Like);

        postcardText.appendChild(tagbox);
        
        // Adiciona tudo ao article
        article.appendChild(a);
        article.appendChild(postcardText);
        
        // Adiciona o article ao container
        listarPtable.appendChild(article);
    });
};
const Deulike = async (id) => {
    const form = document.getElementById(`form${id}`);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
 
        const response = await fetch('/api/paginas');
        const cachorros = await response.json();
       const cachorro=cachorros.filter(cachorro =>  cachorro.id === id);
let cont=0;
       const opt = document.getElementById(`botao${id}`).value;
      
    
    if(opt=="false"){

cont++;


document.getElementById(`botao${id}`).value="true";
listar(cachorros, cont);

    }else{

        cont= cont-1;
     
        document.getElementById(`botao${id}`).value="false";
        listar(cachorros, cont);
    }

}
    )};