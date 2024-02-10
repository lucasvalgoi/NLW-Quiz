const perguntas = [
    {
        pergunta: "Qual é a função do operador '===' em JavaScript?",
        respostas: [
            "Compara se dois valores são iguais em valor e tipo",
            "Compara se dois valores são iguais em valor, independentemente do tipo",
            "Compara se dois valores são iguais em tipo, independentemente do valor",
        ],
        correta: 0
    },
    {
        pergunta: "Como se declara uma variável em JavaScript?",
        respostas: [
            "let myVar;",
            "const myVar;",
            "ambas as opções acima estão corretas",
        ],
        correta: 2
    },
    {
        pergunta: "Qual é o resultado da expressão '5' + '5' em JavaScript?",
        respostas: [
            "10",
            "'55'",
            "Erro",
        ],
        correta: 1
    },
    {
        pergunta: "O que o operador '==' faz em JavaScript?",
        respostas: [
            "Compara dois valores em tipo e valor",
            "Atribui um valor a uma variável",
            "Compara dois valores apenas em valor",
        ],
        correta: 2
    },
    {
        pergunta: "Qual é o resultado da expressão '10 % 3' em JavaScript?",
        respostas: [
            "3",
            "1",
            "0.3333333333333333",
        ],
        correta: 1
    },
    {
        pergunta: "Como você imprime algo no console em JavaScript?",
        respostas: [
            "print()",
            "log()",
            "console.log()",
        ],
        correta: 2
    },
    {
        pergunta: "Qual é a maneira correta de escrever um comentário de uma linha em JavaScript?",
        respostas: [
            "// Comentário",
            "<!-- Comentário -->",
            "/* Comentário */",
        ],
        correta: 0
    },
    {
        pergunta: "Qual é o método usado para converter um objeto JavaScript em uma string JSON?",
        respostas: [
            "stringify()",
            "parse()",
            "convert()",
        ],
        correta: 0
    },
    {
        pergunta: "O que o método 'isNaN()' faz em JavaScript?",
        respostas: [
            "Verifica se um valor é do tipo 'NaN'",
            "Verifica se um valor é numérico",
            "Verifica se um valor é uma string",
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a maneira correta de escrever um loop 'for' em JavaScript?",
        respostas: [
            "for (let i = 0; i < 5; i++) {}",
            "for (i = 0; i < 5; i++) {}",
            "for (i = 0; i < 5) {}",
        ],
        correta: 0
    }
];

// o "document.querySelector" está sendo usado da mesma forma na linha abaixo, porém, agora estou selecionando pelo "id"
const quiz = document.querySelector('#quiz')

// o "document.querySelector" está sendo usado para ir até o meu documento HTML e selecionar tudo que está no 'template'
const template = document.querySelector('template')

// o 'new' é uma palavra reservada do JS para criar coisas novas,geralmente um 'obejto' específico, e o 'Set()' (é esse objeto específico) é um conjunto em que eu posso Adicionar ou Tirar, mas nunca posso repetir o que tem dentro dele
const corretas = new Set()

// o '.length' é usado para mostrar o total dos objetos que estão dentro da Array, mas será contado a partir do número 1
const totalDePerguntas = perguntas.length
const mostrarTotal = document.querySelector('#acertos span')

// como na linha acima eu criei a 'const mostrarTotal' para verificar os meus acertos, agora aqui eu estou subtituindo conteúdo em texto do valor da variável 'mostrarTotal' para o 'size'(o size está mostrando o valor das respostas corretas conforme elas são acertadas) das respostas corretas junto com a variável 'totalDePerguntas'
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas

// o "appendChild(quizItem)" está sendo usado para adicionar/colocar o que está declarado na variável "quizItem" na variável "quiz"

// laço de repetição das perguntas
for (const item of perguntas) {
    // o "template.content.cloneNode(true)" está sendo usado para clonar todos os Nós/filhos(tags) que estão dentro do conteúdo do template lá no documento HTML
    const quizItem = template.content.cloneNode(true)

    // aqui a variável "quizItem" junto com o "querySelector" está sendo usada para procurar todo o conteúdo em TEXTO(textContent) do 'h3' para ser transformado em cada pergunta da variável 'const perguntas' lá de cima
    quizItem.querySelector('h3').textContent = item.pergunta

    // laço de repetição para mostrar todas as respostas uma de cada vez (esse for fica dentro do for das perguntas pq ele faz parte do conteúdo inteiro das perguntas)
    for(let resposta of item.respostas) {
        const dt = quizItem.querySelector('dl dt').cloneNode(true)
        dt.querySelector('span').textContent = resposta
        // o indexOf é uma função que vai me ajudar a pesquisar o índice da informação que eu passei (que no caso aqui ele vai procurar o índice da variável "item", que são os objetos lá da "const pergunta", que vai do 0 ao 9) 
        dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))

        // como aqui eu percebi que o 'value' de cada respota estava tudo com o valor atribuído de 0, eu preciso usar a variável 'dt' junto com o 'querySelector('input').value' para eu ir buscar no meu documento HTML apenas o 'value' e atribuir um novo valor em que o 'item.respotas.indexOf(resposta)' vai ir em cada item das respotas e vai procurar o índice(as alternativas)/resposta de cada pergunta da variável
        dt.querySelector('input').value = item.respostas.indexOf(resposta)

        // junto com o '.onchange' e a Arrow Function, eu estou dizendo para o computador que toda vez que esse 'input' for mudado(ocorrer um "evento"), vai executar o que eu coloquei dentro da Arrow Function
        dt.querySelector('input').onchange = (event) => {
            const estaCorreta = event.target.value == item.correta //true

            // aqui eu estou colocando a função '.delete(item)' pra informar que eu quero que mude/delete a variável 'item' conforme eu erro ou acerto para que, se errar, diminuir o valor dos acertos(caso tenha 1 ou mais acertos), ou se acertar, aumente o valor dos acertos
            corretas.delete(item)
            if(estaCorreta) {
                corretas.add(item)
            }

            // como nessa váriavel eu quero que ela apareça toda vez que eu vou acertando ou errando(interagindo com a página), e esse bloco de código é onde está rodando todas as vezes que eu interajo com a página, eu tenho que colocar ela aqui também
            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
        }

        // aqui o "querySelector" está sendo usando para procurar o 'dl' para ser colocado na tela o 'dt'(que é um "filho" do dl)
        quizItem.querySelector('dl').appendChild(dt)
    }

    // aqui estou usando a variável "quizItem" junto com o "querySelector" para selecionar a parte da "Resposta A" e removendo, para somente aparecer as perguntas usadas no laço de repetição acima
    quizItem.querySelector('dl dt').remove()

    
    // coloca a pergunta na tela
    quiz.appendChild(quizItem)
}