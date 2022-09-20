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
var produtosCru = localStorage.getItem('produtos')
if (produtosCru != null) { 
    var produtos = JSON.parse(produtosCru)
} else {
    var produtos = []
}






//loop 
function reescrevaLista() { 
    document.querySelector(".extrato-tabela tbody").innerHTML = ""

    //selecionar +/-
    for(let i = 0; i < produtos.length; i ++) { 
        var tipoTransacao = "-"

        if (produtos[i].tipo == "Compra") { 
            tipoTransacao = "+"
        }
        document.querySelector('.extrato-tabela tbody').innerHTML +=`
        <tr class="borda-acima" id="uma-linha">
            <td class="text-right">${tipoTransacao}</td>
            <td>${produtos[i].nome}</div>
            </td>
            <td class="text-right">R$ ${produtos[i].valor}
            </td>
        </tr>`
    }

    
    
}

function enviarFormulario(e) { 
    e.preventDefault()
    console.log(e.target.elements)

    console.log(e)

    var produtosCru = localStorage.getItem('produtos')
    if (produtosCru != null) { 
        var produtos = JSON.parse(produtosCru)
    } else {
        var produtos = []
    }

    produtos.push({
        tipo: e.target.elements['selecionar-transacao'].value,
        nome: e.target.elements['nome-mercadoria'].value,
        valor: e.target.elements['valor-mercadoria'].value

    })

    localStorage.setItem('produtos', JSON.stringify(produtos))
    reescrevaLista()
    document.getElementById('listagem').click()
}



//limpar extrato 
function limparExtrato() {
    alert("Confirma a exclusão dos dados do extrato!")
    produtos.remove()
    localStorage.setItem('produtos', JSON.stringify(produtos))
    
}