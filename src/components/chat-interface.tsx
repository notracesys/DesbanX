'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Message = {
  id: number;
  sender: 'user' | 'team';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
};

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3 rounded-lg">
    <span className="text-muted-foreground text-sm">Digitando</span>
    <div className="flex space-x-1">
        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
    </div>
  </div>
);


export default function ChatInterface() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  useEffect(() => {
    const suspensionTime = searchParams.get('suspensionTime');
    const thirdPartySoftware = searchParams.get('thirdPartySoftware');
    const banReason = searchParams.get('banReason');
    const firstOffense = searchParams.get('firstOffense');
    const hasMadePurchases = searchParams.get('hasMadePurchases');
    const priorWarnings = searchParams.get('priorWarnings');
    const banDescription = searchParams.get('banDescription');

    const initialMessageContent = `Olá Equipe da Desban X.
Minha conta foi banida há: ${suspensionTime || 'Não informado'}.
Usei software de terceiros: ${thirdPartySoftware || 'Não informado'}.
O motivo do banimento foi: ${banReason || 'Não informado'}.
É minha primeira suspensão: ${firstOffense || 'Não informado'}.
Já fiz compras na conta: ${hasMadePurchases || 'Não informado'}.
Recebi avisos prévios: ${priorWarnings || 'Não informado'}.

Descrição do ocorrido:
"${banDescription || 'Nenhuma descrição fornecida.'}"
`;

    const userMessage: Message = {
      id: 1,
      sender: 'user',
      content: initialMessageContent,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    setMessages([userMessage]);

    // Simula tempo de leitura (1.5s)
    const readingTimer = setTimeout(() => {
        setIsTyping(true);

        // Simula tempo de digitação (4s)
        const typingTimer = setTimeout(() => {
            const teamResponse: Message = {
                id: 2,
                sender: 'team',
                content: '👋 Olá! Recebemos suas informações. Após uma análise preliminar, identificamos que seu caso tem características de um banimento automático, o que significa que existem chances reais de recuperação. Nossa equipe pode preparar uma defesa técnica detalhada para você. 📄',
                timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, teamResponse]);
            setIsTyping(false);

            // Inicia a segunda sequência de mensagens
            const readingTimer2 = setTimeout(() => {
              setIsTyping(true);

              const typingTimer2 = setTimeout(() => {
                const teamResponse2: Message = {
                  id: 3,
                  sender: 'team',
                  content: `🤔 Muitos banimentos acontecem sem análise humana detalhada.\nQuando o caso é apresentado da forma certa, a plataforma pode reavaliar a decisão.💡\n\nÉ exatamente nesse ponto que a equipe da DesbanX atua. 💪`,
                  timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages((prev) => [...prev, teamResponse2]);
                setIsTyping(false);

                 // Inicia a terceira sequência de mensagens (pergunta)
                 const readingTimer3 = setTimeout(() => {
                    setIsTyping(true);

                    const typingTimer3 = setTimeout(() => {
                        const teamResponse3: Message = {
                            id: 4,
                            sender: 'team',
                            content: 'Você deseja que a equipe da DesbanX inicie a análise completa do seu caso?',
                            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                        };
                        setMessages((prev) => [...prev, teamResponse3]);
                        setIsTyping(false);
                        setShowOptions(true);
                    }, 3000); // 3s digitando

                    return () => clearTimeout(typingTimer3);
                }, 5000); // 5s lendo
                
                return () => clearTimeout(readingTimer3);


              }, 4000); // 4 segundos digitando

              return () => clearTimeout(typingTimer2);
            }, 5000); // 5 segundos lendo

            return () => clearTimeout(readingTimer2);

        }, 4000); // 4 segundos digitando

        return () => clearTimeout(typingTimer);
    }, 1500); // 1.5 segundos lendo

    return () => clearTimeout(readingTimer);
  }, [searchParams]);

  const MessageStatus = ({ status }: { status: Message['status'] }) => {
    if (status === 'sent') return <Check className="h-4 w-4 text-muted-foreground" />;
    if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
    if (status === 'read') return <CheckCheck className="h-4 w-4 text-blue-500" />;
    return null;
  }

  const handleOptionClick = (option: 'sim' | 'nao') => {
    const content = option === 'sim' 
        ? 'Sim, quero tentar recuperar minha conta' 
        : 'Não, apenas estou me informando';
    
    const userMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
    };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);

    if (option === 'sim') {
        // Nova sequência para a opção "Sim"
        setTimeout(() => { // Simula leitura (3s)
            setIsTyping(true);
            setTimeout(() => { // Simula digitação (3s)
                const finalResponse: Message = {
                    id: messages.length + 3, // ID único
                    sender: 'team',
                    content: 'Ótima escolha.\n\nVocê está dando o passo que a maioria não dá — recorrer da forma correta.',
                    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                }
                setMessages(prev => [...prev, finalResponse]);
                setIsTyping(false);

                // Redireciona para o WhatsApp após a mensagem final
                setTimeout(() => {
                   window.location.href = 'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20iniciar%20a%20an%C3%A1lise%20da%20minha%20conta.';
                }, 1000);

            }, 3000);
        }, 3000);
    } else {
        // Simula resposta da equipe para "Não"
        setIsTyping(true);
        setTimeout(() => {
            const finalResponse: Message = {
                id: messages.length + 2,
                sender: 'team',
                content: 'Entendido. Se mudar de ideia, estaremos por aqui para ajudar. Recomendamos não demorar muito, pois o tempo é um fator importante para a recuperação. Boa sorte!',
                timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages(prev => [...prev, finalResponse]);
            setIsTyping(false);
        }, 2000);
    }
  }


  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="bg-card border-b p-3 flex items-center gap-3">
            <Avatar>
                <AvatarImage src="/desbanlogo.png" alt="DesbanX Logo" />
                <AvatarFallback>DX</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="font-bold">Equipe DesbanX</h2>
                </div>
                <p className="text-xs text-muted-foreground">Online</p>
            </div>
        </div>

        <div className="flex-grow p-4 overflow-y-auto bg-background/50">
            <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                        'flex items-end gap-2',
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {msg.sender === 'team' && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/desbanlogo.png" alt="DesbanX Logo" />
                                <AvatarFallback>DX</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={cn(
                                'max-w-md md:max-w-lg rounded-lg p-3 text-white',
                                msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                            )}
                            >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <div className="flex justify-end items-center gap-1 mt-1">
                                <span className="text-xs text-white/60">{msg.timestamp}</span>
                                {msg.sender === 'user' && <MessageStatus status={msg.status} />}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/desbanlogo.png" alt="DesbanX Logo" />
                            <AvatarFallback>DX</AvatarFallback>
                        </Avatar>
                        <div className="max-w-md rounded-lg p-2 bg-secondary">
                            <TypingIndicator />
                        </div>
                    </div>
                )}
                 <div ref={chatEndRef} />
            </div>
        </div>
        <div className="bg-card border-t p-4">
            {showOptions && (
                <div className="flex flex-col sm:flex-row gap-2 max-w-4xl mx-auto animate-in fade-in-50 duration-500">
                     <Button 
                        onClick={() => handleOptionClick('sim')}
                        className="flex-1 font-bold bg-green-600 hover:bg-green-700 text-white"
                     >
                        Sim, quero tentar recuperar minha conta
                    </Button>
                    <Button 
                        onClick={() => handleOptionClick('nao')}
                        variant="secondary"
                        className="flex-1 font-semibold"
                    >
                       Não, apenas estou me informando
                    </Button>
                </div>
            )}
        </div>
    </div>
  );
}
