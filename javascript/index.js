//selecionar botão
const menuHamburguer = document.querySelector('.menu-hamburguer');

//o que se faz quando a função tiver ativada
function toggleMenu() {
    const nav = document.querySelector('.nav'); //seleciona nav
    nav.classList.toggle('ativo'); //add uma class = add caso não tenha e remova caso tenha
}

//seleciona botão para ouvir um evento e ativar uma função
menuHamburguer.addEventListener('click', toggleMenu);


//colocar a lista em um array com objeto dentro
const produtos = [
    { 
        tipo: 'soma',
        nome: 'blusa',
        valor: 'R$ 20,00'
    },

    {
        tipo: 'divisão',
        nome: 'calça',
        valor: '30,00'
    }

]; 

//loop 
function reescrevaLista() { 
    for (extrato in produtos) {
        document.querySelector('.extrato-tabela').innerHTML +=`
        <tr class="borda-acima" id="uma-linha">
            <td class="text-right">${produtos[extrato].tipo}</td>
            <td>${produtos[extrato].nome}</div>
            </td>
            <td class="text-right">R$ ${produtos[extrato].valor}
            </td>
        </tr>`
    }

}

//limpar extrato 
function limparExtrato() {
    alert("Confirma a exclusão dos dados do extrato!")
    produtos.remove()
}