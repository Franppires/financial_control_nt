// selecionar por ID = document.getElementById("id");
// selecionar por CSS = document.querySelector("#id .class")

// validação campos e mascara do valor 
const entradaValor = document.getElementById("valor");
entradaValor.addEventListener("keyup", formatarMoeda); 

// function formatarMoeda(e) { 
//     var valor = e.target.value.replace(/\D/g,"");

//     valor = (valor/100).toFixed(2) + "";
//     valor = valor.replace(".", ",");
//     valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
//     valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");

//     e.target.value = valor;
// }
// inicia local storage vazio 
const extrato = [];

if (localStorage.getItem("transacao")) { 
    extrato = JSON.parse(localStorage.getItem("transacao"))
}

// moeda local 
const formataMoeda = new Intl.NumberFormat("pt-br", { 
    style: "moeda", 
    currency: "BRL",
});

// incluir itens do html 
function desenhaTabela() { 
    let selecionaTabela = document.querySelector(".extrato-tabela tbody"); 
    let total = 0 // começa em 0

// testar a quantidade de itens se é 0
    if (extrato.length == 0) { 
        selecionaTabela.innerHTML += `
        <tr class="transacao-mercadoria"> 
        <td style="border:none; text-align:center; width:100%; padding-let:60px;">
        Nenhuma transação cadastrada
        </td>
        </tr>
        `; 
    }

// verifica itens do extrato, transf. numeros em reais, se for valor mesmo e substitui por vazio. 
// variavel guarda a substituição
    for (item in extrato) { 
        let entradaValor = parseFloat(
            extrato[item].entradaValor.replace(/[^0-9]/g,"")
        ); 
        if (extrato[item].tipoSelecao == "Compra") { 
            total -= entradaValor; 
        } else { 
            total += entradaValor;      
        }
// insere tabela no html e pega valor extrato, testa sinal de -/+ 
        selecionaTabela.innerHTML += `
        <tr class="transacao-mercadoria">
        <td style="padding-let:22px;">
        ${extrato[item].tipoSelecao == "Compra" ? "-" : "+"} 
        &nbsp; ${extrato[item].entradaMercadoria}
        </td>
        <td class="transacao-mercadoria" style="text-align:start;"> 
        ${formataMoeda.format(entradaMercadoria.toString().replace(/[0-9]{2}$/g, "$1"))}
        </td> 
        </tr> 
        `;
    }




}




// // ler abela pelo onsubmit 
// function lerTabela(e) { 
//     e.preventDefault();

//chamando elementos do submit 
    let entradaMercadoria = e.target.elements["nome-mercadoria"].value;
    let entradaValor = e.target.elements["valor"].value; 
    let selecao = e.target.elements["selecionar-transacao"];
    let tipoSelecao = e.target.elements[selecao.selectedIndex].valor; 

// // chamando elementos para local storage    
    

// }


// function adicionarTransacao(e) { 
//     e.preventDefault();    

//     //usando localStorage para armazenar dados 
//     var extratoCru = localStorage.getItem('extrato')

//     if (extratoCru == null) { 
//         var extrato = JSON.parse(extratoCru)
//     } else { 
//         var extrato = [];
//     }

//     // está indo pro localstorage, mas não aparece na tabela 
//     extrato.push({
//         selecionarTransacao: e.target.elements['selecionar-transacao'].value,
//         nomeMercadoria: e.target.elements['nome-mercadoria'].value,
//         valor: e.target.elements['valor'].value
//     });

//     localStorage.setItem('extrato', JSON.stringify(extrato));

//     console.log(extrato)
// }


// //contatenação de array para realizar a limpeza do extrato, usando limpar extrato 
// function limparExtrato() {

//     linhasExistentes = [...document.querySelectorAll('table.tabela tbody .conteudo-dinamico')];
//     linhasExistentes.forEach(element => {
//     element.remove()
// });
// }


