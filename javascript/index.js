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
    document.querySelector(".extrato-tabela").innerHTML = ""

    //selecionar +/-
    for(let i = 0; i < produtos.length; i ++) { 
        var tipoTransacao = "-"

        if (produtos[i].tipo == "Compra") { 
            tipoTransacao = "+"
        }
        //extrato na tabela
        document.querySelector(".extrato-tabela").innerHTML +=`
        <tr class="borda-acima" id="uma-linha">
            <td class="text-right">${tipoTransacao}</td>
            <td>${produtos[i].nome}</div>
            </td>
            <td class="text-right">R$ ${produtos[i].valor}
            </td>
        </tr>`
    }

    //informação antes de nova transação
    if (produtos.length == 0) { 
        document.querySelector('table.extrato-tabela tbody').innerHTML = `
        <tr class="text-center">
            <td colspan="3" class="text-center"> Por favor, adicione uma nova transação </td>
        </tr>
        `
    }

    //resultado de lucro e prejuizo
    let lastIndex = 0 
    let valorFinalString = ""
    total = somaExtrato()

    //sinal para [lucro] / [prejuizo]
    lucroPrejuizo = "[LUCRO]"

    if (total < 0) { 
        lucroPrejuizo = "[PREJUIZO]"
    }

    if (total == 0) { 
        lucroPrejuizo = ""
    }
    totalEscrito = total.toFixed(2)
    totalEscrito = totalEscrito.replace("-", "")

    //milhar 

    
}

//soma do extrato
function somaExtrato() { 
    var total = 0 

    for (let i = 0; i < produtos.length; i++) { 
        let valorSomar = parseFloat(produtos[i].valor.replace(/\./g, "").replace(/,/g, "."))
        
        if (produtos[i].tipo != "Compra") { 
            valorSomar *= -1
        }
        total += valorSomar
    }

    return total
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