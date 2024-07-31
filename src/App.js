import React, { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';

const timelineEvents = [
  { year: 1940, event: "Bem-vindo à Linha do Tempo da IA", icon: "🚀", details: "A história da Inteligência Artificial, desde seus primórdios até os avanços mais recentes." },
  { year: 1950, event: "Teste de Turing", icon: "🧠", details: "Alan Turing publica 'Computing Machinery and Intelligence', introduzindo o teste de Turing e abrindo as portas para o que seria conhecido como IA." },
  { year: 1951, event: "Primeira Rede Neural Artificial", icon: "🔌", details: "Marvin Minsky e Dean Edmonds desenvolvem a SNARC, usando 3.000 válvulas para simular uma rede de 40 neurônios." },
  { year: 1952, event: "Programa de Damas", icon: "🎲", details: "Arthur Samuel desenvolve o Programa de Jogo de Damas, o primeiro programa de jogos do mundo que era auto-aprendiz." },
  { year: 1956, event: "Nascimento da IA", icon: "💡", details: "John McCarthy, Marvin Minsky, Nathaniel Rochester e Claude Shannon cunham o termo 'inteligência artificial' em uma proposta para um workshop." },
  { year: 1958, event: "Perceptron", icon: "📊", details: "Frank Rosenblatt desenvolve o perceptron, uma RNA inicial que poderia aprender com dados e se tornou a base para as redes neurais modernas." },
  { year: 1959, event: "Aprendizado de Máquina", icon: "🤖", details: "Arthur Samuel cunha o termo 'aprendizado de máquina' em um artigo seminal explicando que o computador poderia ser programado para superar seu programador." },
  { year: 1964, event: "STUDENT", icon: "📚", details: "Daniel Bobrow desenvolve STUDENT, um programa inicial de processamento de linguagem natural projetado para resolver problemas de álgebra em palavras." },
  { year: 1965, event: "Sistema Especialista Dendral", icon: "🧪", details: "Edward Feigenbaum e colegas desenvolvem o Dendral, o primeiro sistema especialista, que auxiliava químicos orgânicos na identificação de moléculas orgânicas desconhecidas." },
  { year: 1966, event: "ELIZA", icon: "💬", details: "Joseph Weizenbaum cria ELIZA, um dos programas de computador mais celebrados de todos os tempos, capaz de se engajar em conversas com humanos." },
  { year: 1969, event: "Limitações das Redes Neurais", icon: "📉", details: "Marvin Minsky e Seymour Papert publicam o livro 'Perceptrons', descrevendo as limitações das redes neurais simples." },
  { year: 1973, event: "Relatório Lighthill", icon: "🚫", details: "James Lighthill lança o relatório 'Inteligência Artificial: Uma Pesquisa Geral', causando redução significativa no apoio do governo britânico à pesquisa em IA." },
  { year: 1980, event: "Renascimento da IA", icon: "💻", details: "As máquinas Lisp são comercializadas, sinalizando um renascimento da IA. Anos depois, o mercado de máquinas Lisp entraria em colapso." },
  { year: 1997, event: "Deep Blue vs. Kasparov", icon: "♟️", details: "O Deep Blue da IBM derrota Garry Kasparov em uma revanche histórica de xadrez, a primeira derrota de um campeão mundial de xadrez reinante por um computador em condições de torneio." },
  { year: 2011, event: "Watson no Jeopardy!", icon: "🏆", details: "IBM Watson vence no programa Jeopardy!, derrotando o campeão de todos os tempos (humano) do programa, Ken Jennings." },
  { year: 2012, event: "Revolução do Deep Learning", icon: "🚀", details: "Geoffrey Hinton e colegas introduzem uma arquitetura CNN profunda que vence o desafio ImageNet e dispara a explosão da pesquisa e implementação de deep learning." },
  { year: 2014, event: "GANs", icon: "🎭", details: "Ian Goodfellow e colegas inventam as redes adversariais generativas, uma classe de frameworks de aprendizado de máquina usados para gerar fotos, transformar imagens e criar deepfakes." },
  { year: 2016, event: "AlphaGo", icon: "🏁", details: "AlphaGo da DeepMind derrota o melhor jogador de Go, Lee Sedol, em Seul, Coreia do Sul, estabelecendo comparações com a partida de xadrez de Kasparov com o Deep Blue quase 20 anos antes." },
  { year: 2017, event: "Transformers", icon: "🔄", details: "Pesquisadores do Google desenvolvem o conceito de transformers no artigo seminal 'Attention Is All You Need', inspirando pesquisas subsequentes em ferramentas que poderiam analisar automaticamente texto não rotulado em grandes modelos de linguagem." },
  { year: 2020, event: "GPT-3", icon: "🌐", details: "OpenAI lança o GPT-3 LLM com 175 bilhões de parâmetros para gerar modelos de texto semelhantes aos humanos." },
  { year: 2022, event: "ChatGPT", icon: "🗨️", details: "OpenAI lança o ChatGPT em novembro para fornecer uma interface de chat para seu LLM GPT-3.5." },
  { year: 2023, event: "GPT-4", icon: "🔮", details: "OpenAI anuncia o GPT-4, um LLM multimodal que recebe prompts de texto e imagem." },
  { year: 2024, event: "Agentic Frameworks", icon: "🤖", details: "Agentes autônomos e agentic frameworks são popularizados" },
];

const decadeSummaries = {
  1940: "Uma viagem pela evolução da Inteligência Artificial!",
  1950: "Fundação da IA: Conceitos fundamentais e primeiros experimentos",
  1960: "Era dos Protótipos: Primeiros chatbots e sistemas especialistas",
  1970: "Desafios e Reajustes: Início do primeiro 'inverno da IA'",
  1980: "Renascimento e Comercialização: IA começa a entrar no mercado",
  1990: "Avanços em Jogos e Linguagem: IA supera humanos em xadrez",
  2000: "Era do Big Data: Grandes conjuntos de dados impulsionam o aprendizado de máquina",
  2010: "Revolução do Deep Learning: Avanços rápidos em visão computacional e processamento de linguagem natural",
  2020: "IA Generativa e Ética: Modelos de linguagem em grande escala e debates sobre o impacto da IA",
};

const AITimeline = () => {
  const [animatedIndices, setAnimatedIndices] = useState([0]);
  const [currentDecade, setCurrentDecade] = useState(1940);
  const [showDecadeHighlight, setShowDecadeHighlight] = useState(true);
  const timelineRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedIndices(prev => {
        const nextIndices = [...prev, prev[prev.length - 1] + 1].slice(-2);
        if (nextIndices[1] >= timelineEvents.length) {
          clearInterval(timer);
          return prev;
        }
        const nextDecade = Math.floor(timelineEvents[nextIndices[1]].year / 10) * 10;
        if (nextDecade !== currentDecade) {
          setCurrentDecade(nextDecade);
          setShowDecadeHighlight(true);
          setTimeout(() => setShowDecadeHighlight(false), 5000);
        }
        
        // Scroll to the newly displayed item
        setTimeout(() => {
          const element = document.getElementById(`timeline-item-${nextIndices[1]}`);
          if (element && timelineRef.current) {
            const containerRect = timelineRef.current.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const scrollTop = elementRect.top - containerRect.top + timelineRef.current.scrollTop - containerRect.height / 2 + elementRect.height / 2;
            timelineRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
          }
        }, 100);

        return nextIndices;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [currentDecade]);

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden flex flex-col relative">
      <h2 className="text-3xl font-bold text-center my-4">Linha do Tempo da Inteligência Artificial</h2>
      <div className="flex-grow overflow-y-auto px-4" ref={timelineRef}>
        <div className="relative">
          <div className="absolute left-1/2 top-0 w-1 bg-blue-900 h-full transform -translate-x-1/2"></div>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              id={`timeline-item-${index}`}
              className={`mb-8 flex items-center transition-all duration-1000 ease-in-out ${
                animatedIndices.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-4' : 'text-left pl-4'}`}>
                <h3 className="text-xl font-bold">{event.year}</h3>
                <p className="text-lg font-semibold">{event.event}</p>
                <p className="text-sm mt-2">{event.details}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl z-10">
                {event.icon}
              </div>
              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
      {showDecadeHighlight && currentDecade && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-500">
          <div className="text-white text-center">
            <h3 className="text-6xl font-bold mb-4">
              {currentDecade === 1940 ? "Linha do Tempo da IA" : `Década de ${currentDecade}`}
            </h3>
            <p className="text-2xl">{decadeSummaries[currentDecade]}</p>
            <Zap className="mx-auto mt-4 animate-pulse" size={48} />
          </div>
        </div>
      )}
      {currentDecade && !showDecadeHighlight && (
        <div className="bg-blue-900 text-white p-4 text-center">
          <h3 className="text-2xl font-bold mb-2">
            {currentDecade === 1940 ? "Linha do Tempo da IA" : `Década de ${currentDecade}`}
          </h3>
          <p>{decadeSummaries[currentDecade]}</p>
          <Zap className="mx-auto mt-2 animate-pulse" size={24} />
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 text-gray-600 text-xs p-2 text-center">
        Criado por Gabriel Serrao | Inspirado por dados de 
        <a href="https://www.techtarget.com/searchenterpriseai/tip/The-history-of-artificial-intelligence-Complete-AI-timeline" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="underline ml-1">
          TechTarget
        </a>
      </div>
    </div>
  );
};

export default AITimeline;