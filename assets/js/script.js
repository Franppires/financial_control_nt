var produto = []
// console.log(produto)


// armazenamento no localStorage
var produtoCru = localStorage.getItem('produto')
if (produtoCru != null) { 
    var produto = JSON.parse(produtoCru)
} else { 
    var produto = []
}

// função para enviar dados 
function enviarTransacao(e) { 
    e.preventDefault()

    // envia dados para localStorage
    produto.push({ 
        tipo: e.target.elements['selecionar-transacao'].selectedIndex == 1 ? '-' : '+', 
        mercadoria: e.target.elements["nome-mercadoria"].value,
        valor: e.target.elements["valor-mercadoria"].value,
    })

    //salvando extrato no localstorage
    localStorage.setItem("produto", JSON.stringify(produto))
    desenhaTabela()
}


// exclusão de extrato 
function excluirExtrato() { 
    for (element of document.querySelectorAll(".conteudo-dinamico")) { 
        //procura a class e se tiver remove
        element.remove()
        localStorage.clear()
        produto = []
        localStorage.setItem("produto", JSON.stringify(produto))
        desenhaTabela()
    }
}

// fazendo a exclusão
function limparExtrato() {
    if (produto != 0 && window.confirm("Realmente deseja excluir transações?")) { 
        excluirExtrato()
    } else if (produto <= 0) { 
        alert("Não há transações para serem excluídas!")
    }
}


function desenhaTabela() { 

    for(transacao in produto) { 
       document.querySelector("table.extrato-tabela thead").innerHTML +=
       ` <tr class="conteudo-dinamico">
            <td>${produto[transacao].tipo}</td>
            <td>${produto[transacao].mercadoria}</td>
            <td>${produto[transacao].valor}</td>
        </tr> `
    }
}

desenhaTabela()
        