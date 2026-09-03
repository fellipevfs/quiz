/**
 * ====================================================================
 * 🎂 CONFIGURAÇÃO DO QUIZ DE ANIVERSÁRIO DA DARAFA
 * ====================================================================
 * 
 * Fala primo! Aqui você pode alterar tudo com total facilidade:
 * - O nome e títulos da prima
 * - A mensagem da carta secreta de aniversário
 * - As perguntas, fotos, opções, respostas certas e historinhas
 * - As fotos em destaque
 * 
 * DICA: As fotos ficam na pasta "fotos/". Para trocar uma foto, basta
 * colocar o nome do arquivo que está dentro da pasta fotos!
 */

const QUIZ_CONFIG = {
  // Informações principais
  birthdayPerson: {
    name: "Rafa",
    nickname: "Rafa",
    title: "Edição Especial de Aniversário ✨",
    subtitle: "O teste definitivo: será que você lembra das nossas melhores histórias, zoeiras e momentos épicos?",
    age: "Mais um ano de pura lenda!",
    whatsappNumber: "", // Opcional: Coloque o número com DDD (ex: "5511999999999") ou deixe vazio
  },

  // Carta de Aniversário exibida no final
  birthdayLetter: {
    title: "Feliz 18 anos, Rafa! 🎂✨",
    subtitle: "De alguém que cresceu do seu lado...",
    paragraphs: [
      "A minha prima está fazendo 18 anos, a Rafa. Não uma prima qualquer que está fazendo 18 anos e \"ah, legal, vou mandar parabéns\".",
      "A pessoa que cresceu como minha irmã, é maior de idade, nós somos. É estranho pensar isso, porque eu lembro de quando éramos crianças e ficávamos correndo na sua rua, quando ficávamos no meu quarto andando de patins e vendo Sou Luna, quando eu ficava correndo de você na escola, quando a gente brigava pelas coisas mais bobas do mundo.",
      "Eu sinto falta dessa época. Às vezes eu me pergunto \"Where'd all time go?\"... parece que ele voou. Mas eu tenho boas lembranças com você quando éramos menores, em 2023, até 2024 que foi um ano bosta, 25, 26 e sempre terei. Você sempre será minha cúmplice, minha irmã. É estranho me emocionar escrevendo isso, pois nós nunca fomos muito das emoções, mas eu queria te dar um abraço agora.",
      "Eu vejo as pessoas falando que quando você tem 18 anos, você sente que já passou muita coisa, mas ainda vai passar muita. Eu sinto isso com você porque eu te conheço a vida toda. Nós vivemos muitos momentos juntos e eu sinto muito medo de não ser mais assim, da gente se afastar, da gente não morar um de frente pro outro quando tiver 30 anos e realizar o sonho daquelas duas crianças que só brigavam. A gente morando um na frente do outro ou não, você sempre será a mais especial pra mim, a 01.",
      "Sempre que eu penso naquelas paradas de \"e se você morresse?\" a primeira pessoa que eu penso na reação, é você. A pessoa que eu imagino falando no meu funeral, é você.",
      "Recentemente eu passei por muita coisa, até uma crise de identidade eu diria. O que foi um choque pra mim, foi pensar em uma frase que só me faz lembrar de você: \"ele se recusava a ser sério\". Eu tatuaria essa frase, mas eu deixei de ser assim e esse não sou eu. Eu quero voltar a ser eu, a ser a gente.",
      "Recentemente eu fui confrontado e disseram \"você não precisa passar o dia 3, 5 e 6 com a Rafa\" mas eu preciso sim. É a Rafa que está aqui desde que eu nasci, ao meu lado, que eu sempre pude contar, que me ajudou a me vestir melhor, a ter um instagram bonito e até a aprender a conversar.",
      "Obrigado Rafa, por tudo que a gente já passou juntos (nem vou citar o afogamento dessa vez)."
    ],
    signature: "Eu te amo Rafa ❤️"
  },

  // Lista de Perguntas do Quiz
  // correctAnswer é o número da opção certa: 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
  questions: [
    {
      id: 1,
      title: "Desafio 1: O Manto Sagrado 🦅",
      question: "Quem foram os autores dos gols desse jogo?",
      image: "fotos/corinthians1.jpg",
      hint: "Dica: Tem o nome do principal jogador nos últimos tempos",
      options: [
        "67 e Cássio (2x)",
        "Fellipe (2x) e Rafa",
        "Yuri e Memphis (2x)",
        "Yuri (2x) e Kaio César",
        "Yuri (2x) e Bidu"
      ],
      correctAnswer: 3,
      commentRight: "No escudo do Corinthians tem dois remos, no do remo não tem nenhum Corinthians",
      commentWrong: "Viajou prç, ce tava la!"
    },
    {
      id: 2,
      title: "Desafio 2: Viagem Musical ✈️",
      question: "Qual foi a trilha sonora da viagem pra Disney?",
      image: "fotos/IMG-20230805-WA0043.jpg",
      hint: "Dica: Um pagodinho daquele jeito",
      options: [
        "Pé na areia",
        "Como me ves",
        "Lagrimas e chuva",
        "Caraca muleke",
        "Flashing lights"
      ],
      correctAnswer: 3,
      commentRight: "CARACA MULEKE QUE DIA QUE ISSO",
      commentWrong: "Nada a ver mn!"
    },
    {
      id: 3,
      title: "Desafio 3: Encontro Familiar 👵",
      question: "Quando vamos a vovó nita, quem é a pessoa mais legal pra encontrar lá?",
      image: "fotos/IMG-20220508-WA0019.jpg",
      hint: "Dica: É de quatro patas?",
      options: [
        "Coxinha de barata",
        "Tio Du",
        "Chica",
        "Isa",
        "Gabi"
      ],
      correctAnswer: 4,
      commentRight: "Pena que o Nino vem junto",
      commentWrong: "Você merece execução"
    },
    {
      id: 4,
      title: "Desafio 4: Cama na sala 🛌",
      question: "Qual numero e nome da camisa que eu estava usando quando gravamos o vlog e descobrimos a cama na sala?",
      image: "fotos/IMG-20240316-WA0090.jpg",
      hint: "Dica: Um jogador inglês lendário",
      options: [
        "9 Yuri Alberto",
        "28 Franzonatto",
        "13 Beckham",
        "12 Davies",
        "56 Morgan"
      ],
      correctAnswer: 2,
      commentRight: "Slk, cravou, goat demais",
      commentWrong: "Essa era difícil, era uma de futebol americano da ross"
    },
    {
      id: 5,
      title: "Desafio 5: Antes e Depois 📸",
      question: "Releituras mais mal feitas da história, mas, qual é o espaço temporal de uma foto pra outra?",
      image: "fotos/IMG-20231021-WA0008.jpg",
      hint: "Dica: Mais de meia década com certeza",
      options: [
        "3 meses",
        "6 anos",
        "9 anos",
        "10 anos",
        "14 horas"
      ],
      correctAnswer: 2,
      commentRight: "2023 foi o ano goat",
      commentWrong: "2014 a 2023 pae"
    },
    {
      id: 6,
      title: "Desafio 6: Atrações 🎢",
      question: "Qual era a atração de outra série/desenho/filme que estava na frente dessa?",
      image: "fotos/IMG-20240411-WA0107.jpg",
      hint: "Dica: Pensa em viagens no tempo",
      options: [
        "O carro e trem do de volta para o futuro",
        "A cinderela pelada",
        "Um cachorro de boné",
        "A gabby daquele desenho bosta",
        "A marylin monroe"
      ],
      correctAnswer: 0,
      commentRight: "Cinderela pelada kkkkkkk",
      commentWrong: "Cinderela pelada kkkkkkk"
    },
    {
      id: 7,
      title: "Desafio 7: Ano Bosta 🗑️",
      question: "Da nem pra ver a foto e 2024 foi ano bosta, então só chuta um ai:",
      image: "fotos/IMG-20240902-WA0028.jpg",
      hint: "Dica: Todas as alternativas parecem boas...",
      options: [
        "Suicídio",
        "Suicídio",
        "Suicídio",
        "Suicídio",
        "Suicídio"
      ],
      correctAnswer: 1, // Tanto faz qual ela marcar, mas vamos setar a B (index 1) como correta pro easter egg
      commentRight: "Era 20% de chance",
      commentWrong: "Era 20% de chance (era a letra B kkkk)"
    },
    {
      id: 8,
      title: "Desafio 8: Encontro de Bebês 👶",
      question: "Quantos dias você tinha quando a gente se conheceu, eu ri e você chorou?",
      image: "fotos/IMG-20250210-WA0025.jpg",
      hint: "Dica: Você mal tinha aberto o olho pra vida",
      options: [
        "15 minutos",
        "2 horas",
        "1 dia",
        "3 dias",
        "94000 minutos"
      ],
      correctAnswer: 2,
      commentRight: "Pode nem me ver que chora, bobona",
      commentWrong: "94000 minutos é igual a 65 dias (quase 65 e meio), tá maluca?!"
    },
    {
      id: 9,
      title: "Desafio 9: O Bot 🤖",
      question: "Um pouco do bot pra ele não ficar excluído. O que aconteceu desde que ele nasceu?",
      image: "fotos/20240722_204344.jpg",
      hint: "Dica: A mais pura verdade está numa alternativa que engloba tudo",
      options: [
        "Ficamos pobres",
        "A família parou de nos amar",
        "Todas as pessoas amaram mais o Dan que a gente",
        "Ele virou gay",
        "Todas as alternativas acima"
      ],
      correctAnswer: 4,
      commentRight: "Cravou (acabou a criatividade)",
      commentWrong: "Moscou (acabou a criatividade)"
    },
    {
      id: 10,
      title: "Desafio 10: Xg de Dormes 😴",
      question: "Dormes aleatórios esperados (Xg) -> estatística medida pelo total de chances de dormes (ex: a cada 100 pessoas em uma cama, 94 dormes dá 0.94 Xg)",
      image: "fotos/20260216_144217.jpg",
      hint: "Dica: Você é uma profissional",
      options: [
        "0.01",
        "1.24",
        "5.87",
        "67.90",
        "176.45"
      ],
      correctAnswer: 4,
      commentRight: "Tu dorme demais!",
      commentWrong: "Muito baixo!"
    }
  ],

  // Fotos selecionadas para o carrossel / stack flutuante da tela inicial
  heroPhotos: [
    { src: "fotos/IMG-20250210-WA0025.jpg", caption: "Aura ✨" },
    { src: "fotos/corinthians1.jpg", caption: "Aqui é Corinthians! 🦅" },
    { src: "fotos/IMG-20230805-WA0043.jpg", caption: "Cafézin na disney 😂" },
    { src: "fotos/IMG-20220508-WA0019.jpg", caption: "Guris 67 🤝" },
    { src: "fotos/20240722_204344.jpg", caption: "Cadê o protagonista? ⏳" }
  ],

  // Todas as fotos para a Galeria / Mural de Memórias
  galleryPhotos: [
    "fotos/IMG-20250210-WA0025.jpg",
    "fotos/20240321_215305.jpg",
    "fotos/IMG-20230805-WA0043.jpg",
    "fotos/IMG-20230805-WA0074.jpg",
    "fotos/IMG-20230805-WA0109.jpg",
    "fotos/IMG-20230805-WA0112.jpg",
    "fotos/IMG-20230805-WA0117.jpg",
    "fotos/IMG-20230805-WA0118.jpg",
    "fotos/IMG-20231021-WA0008.jpg",
    "fotos/IMG-20231021-WA0014.jpg",
    "fotos/IMG-20240411-WA0107.jpg",
    "fotos/IMG-20240411-WA0121.jpg",
    "fotos/IMG-20240411-WA0132.jpg",
    "fotos/IMG-20240411-WA0149.jpg",
    "fotos/IMG-20240902-WA0017.jpg",
    "fotos/IMG-20240902-WA0021.jpg",
    "fotos/IMG-20240902-WA0022.jpg",
    "fotos/IMG-20240902-WA0024.jpg",
    "fotos/IMG-20240902-WA0025.jpg",
    "fotos/IMG-20240902-WA0027.jpg",
    "fotos/IMG-20240902-WA0028.jpg",
    "fotos/IMG-20240902-WA0029.jpg",
    "fotos/IMG-20240902-WA0032.jpg",
    "fotos/IMG-20240903-WA0013.jpg",
    "fotos/IMG-20240904-WA0104.jpg",
    "fotos/IMG-20250309-WA0052.jpg",
    "fotos/IMG-20250309-WA0053.jpg",
    "fotos/IMG-20250902-WA0101.jpg",
    "fotos/IMG-20250902-WA0104.jpg",
    "fotos/IMG-20260216-WA0073.jpeg",
    "fotos/20260216_144217.jpg",
    "fotos/20260809_163005.jpg",
    "fotos/20240722_204247.jpg",
    "fotos/20240722_204344.jpg",
    "fotos/20240803_144940.jpg",
    "fotos/20240919_191828.jpg",
    "fotos/20241020_190947.jpg",
    "fotos/20251111_195216.jpg",
    "fotos/20230714_221451.jpg",
    "fotos/20230811_152142.jpg",
    "fotos/20230828_132622.jpg",
    "fotos/20230828_132641.jpg",
    "fotos/20240318_173826.jpg",
    "fotos/20230121_212114.jpg",
    "fotos/20230121_212120.jpg",
    "fotos/20230121_212125.jpg",
    "fotos/20230121_212132.jpg",
    "fotos/20230121_212312.jpg",
    "fotos/20221029_220803.jpg",
    "fotos/20221124_201351.jpg",
    "fotos/IMG-20220423-WA0004.jpg",
    "fotos/IMG-20220501-WA0001.jpg",
    "fotos/IMG-20220508-WA0028.jpg",
    "fotos/IMG-20220508-WA0029.jpg",
    "fotos/IMG-20220508-WA0030.jpg",
    "fotos/IMG-20220508-WA0031.jpg",
    "fotos/IMG-20220508-WA0033.jpg",
    "fotos/IMG-20220508-WA0040.jpg",
    "fotos/IMG-20220508-WA0045.jpg",
    "fotos/IMG-20220508-WA0046.jpg",
    "fotos/IMG-20220508-WA0049.jpg",
    "fotos/IMG-20220508-WA0050.jpg",
    "fotos/IMG-20220508-WA0053.jpg",
    "fotos/IMG-20220508-WA0064.jpg",
    "fotos/IMG-20220903-WA0008.jpg",
    "fotos/IMG-20221220-WA0012.jpg",
    "fotos/IMG-20221220-WA0014.jpg",
    "fotos/IMG-20221220-WA0015.jpg",
    "fotos/IMG-20221220-WA0016.jpg",
    "fotos/IMG-20221220-WA0018.jpg",
    "fotos/IMG-20230205-WA0022.jpg",
    "fotos/IMG-20230704-WA0060.jpg",
    "fotos/IMG-20230704-WA0061.jpg",
    "fotos/IMG-20230903-WA0000.jpg",
    "fotos/IMG-20231023-WA0008.jpeg",
    "fotos/IMG-20240316-WA0090.jpg",
    "fotos/IMG-20240324-WA0013.jpg",
    "fotos/IMG-20240705-WA0010.jpg",
    "fotos/IMG-20240705-WA0016.jpg",
    "fotos/IMG_20190828_204423.jpg",
    "fotos/IMG_20191202_211610.jpg",
    "fotos/IMG_20210512_122254.jpg",
    "fotos/IMG_20210520_152714.jpg",
    "fotos/IMG_20210711_123938.jpg",
    "fotos/IMG_20221203_211227_434.jpg",
    "fotos/IMG_20231230_175007_721.webp",
    "fotos/IMG_20241224_224855_624.webp",
    "fotos/IMG_20241224_235739_557.webp",
    "fotos/IMG-20180902-WA0164.jpg",
    "fotos/IMG-20180902-WA0165.jpg",
    "fotos/IMG-20180902-WA0167.jpg",
    "fotos/IMG-20180902-WA0169.jpg",
    "fotos/IMG-20190726-WA0005.jpg"
  ]
};
