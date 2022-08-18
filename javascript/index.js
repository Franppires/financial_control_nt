// selecionar por ID = document.getElementById("id");
// selecionar por CSS = document.querySelector("#id .class")

// validação campos e mascara do valor 
// const entradaValor = document.getElementById("valor");
// entradaValor.addEventListener("keyup", formatarMoeda); 

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
    style: "currency", 
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
// testar valor do extrato, formatação moeda e subst. , por . com replace
    if (extrato.length > 0) {
        selecionaTabela;innerHTML += `
        <tr class="transacao-mercadoria"> 
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td class="transacao-mercadoria" style="padding-left:25px; border:none;"><strong>
        Total
        </strong></td>
        <td class="transacao-mercadoria" style="border:none; font-weight:600; text-align:end; padding-bottom:0px ">
        ${formataMoeda.format(total.toString().replace(/([0-9])$/g, ".$1"))}
        </td>
        </tr>
        <tr class="transacao-mercadoria"> 
        <td style="border:none;"> 
        </td> 
        <td  class="transacao-mercadoria" style= "border:none; padding: 0px 0px 35px 10px; text-align:end; "> 
        ${extrato[item].tipoSelecao == "Compra" ? "[DESPESA]" : "[LUCRO]"}
        </td> 
        </tr>
        `; 
    }
}
//mascara para input de valor 
// regex para letras, verifica as teclas digitadas e previne 
const padraoLetras = /[^0-9]/; 

function mask(e) { 
    if(padraoLetras.test(e.key)) { 
        console.log(e.key); 
        e.preventDefault();
        return; 
    }
    if (!e.target.value) return; // retorna se for diferente 
    valor = e.target.value.toString(); // recebe valor e converte para string 
    valor = valor.replace(/[\D]+/g, ""); // muda o valor se for dif. de numero para vazio 
    valor = valor.replace(/([0-9]{1})$/g, ",$1") // recebe formato moeda e coloca virgula 

    if (valor.length >= 6) { // se for maior ou igual
        while (/([0-9]{4})[,|\.]/g.test(valor)) { 
            valor = valor.replace(/([0-9]{1})$/g, ",$1");   // acrescenta virgula   
            valor = valor.replace(/([0-9]{3})[,|\.]/g, ".$1"); // casa decimal
        }
    }
    e.target.value = valor;
}


gi

// // ler abela pelo onsubmit 
// function lerTabela(e) { 
//     e.preventDefault();

//chamando elementos do submit 
    let entradaMercadoria = e.target.elements["nome-mercadoria"].value;
    let entradaValor = e.target.elements["valor-mercadoria"].value; 
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


