import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const timelineData = [
  { year: 1950, event: "Alan Turing publica 'Computing Machinery and Intelligence', introduzindo o Teste de Turing" },
  { year: 1951, event: "Marvin Minsky e Dean Edmonds desenvolvem a primeira rede neural artificial, SNARC" },
  { year: 1952, event: "Arthur Samuel desenvolve o primeiro programa de auto-aprendizagem para jogar damas" },
  { year: 1956, event: "O termo 'Inteligência Artificial' é cunhado na Conferência de Dartmouth" },
  { year: 1958, event: "John McCarthy desenvolve a linguagem de programação Lisp" },
  { year: 1959, event: "Arthur Samuel cunha o termo 'machine learning'" },
  { year: 1964, event: "Daniel Bobrow desenvolve STUDENT, um programa de processamento de linguagem natural" },
  { year: 1965, event: "Desenvolvimento do primeiro sistema especialista, Dendral" },
  { year: 1966, event: "Joseph Weizenbaum cria ELIZA, um dos primeiros chatbots" },
  { year: 1969, event: "Marvin Minsky e Seymour Papert publicam o livro 'Perceptrons'" },
  { year: 1973, event: "O Relatório Lighthill causa redução no financiamento de pesquisas em IA" },
  { year: 1980, event: "Renascimento da IA com a comercialização das máquinas Lisp" },
  { year: 1985, event: "Judea Pearl introduz as redes bayesianas" },
  { year: 1989, event: "Yann LeCun demonstra o uso de redes neurais convolucionais para reconhecimento de caracteres" },
  { year: 1997, event: "Deep Blue da IBM derrota o campeão mundial de xadrez Garry Kasparov" },
  { year: 2000, event: "Pesquisadores da Universidade de Montreal publicam sobre modelos de linguagem usando redes neurais" },
  { year: 2006, event: "Fei-Fei Li inicia o trabalho no banco de dados visual ImageNet" },
  { year: 2011, event: "IBM Watson vence no programa de TV Jeopardy!" },
  { year: 2012, event: "AlexNet vence a competição ImageNet, impulsionando a pesquisa em deep learning" },
  { year: 2014, event: "O Facebook desenvolve o sistema de reconhecimento facial DeepFace" },
  { year: 2016, event: "AlphaGo da DeepMind derrota o campeão de Go Lee Sedol" },
  { year: 2017, event: "Pesquisadores do Google introduzem o conceito de transformers" },
  { year: 2020, event: "OpenAI lança o GPT-3 com 175 bilhões de parâmetros" },
  { year: 2022, event: "OpenAI lança o ChatGPT, revolucionando a interação homem-máquina" },
  { year: 2023, event: "OpenAI anuncia o GPT-4, um modelo de linguagem multimodal" }
];

const AIEvolutionTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex < timelineData.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000); // Change event every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Evolução da Inteligência Artificial</h1>
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-300"></div>
        {timelineData.map((item, index) => (
          <div 
            key={index} 
            className={`absolute w-full transition-all duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 translate-y-0' : 
              index < currentIndex ? 'opacity-0 -translate-y-full' : 'opacity-0 translate-y-full'
            }`}
          >
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-4' : 'pl-4'}`}>
                <h2 className="text-xl font-semibold text-blue-700">{item.year}</h2>
                <p className="text-gray-600 mt-2">{item.event}</p>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="bg-blue-500 rounded-full p-2">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="w-5/12"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button 
          onClick={handlePlayPause}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          {isPlaying ? 'Pausar' : 'Iniciar'} Animação
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center text-yellow-600">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">Clique no botão para iniciar ou pausar a animação!</span>
      </div>
    </div>
  );
};

export default AIEvolutionTimeline;