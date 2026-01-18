'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import Link from 'next/link';


type Message = {
  id: number;
  sender: 'user' | 'team';
  content: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'feedback';
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
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showImportantNotice, setShowImportantNotice] = useState(false);
  const [showPurchaseButton, setShowPurchaseButton] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);
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
      status: 'read',
      type: 'text',
    };

    setMessages([userMessage]);

    const readingTimer = setTimeout(() => {
        setIsTyping(true);

        const typingTimer = setTimeout(() => {
            const teamResponse: Message = {
                id: 2,
                sender: 'team',
                content: '👋 Olá! Recebemos suas informações. Após uma análise preliminar, identificamos que seu caso tem características de um banimento automático, o que significa que existem chances reais de recuperação. Nossa equipe pode preparar uma defesa técnica detalhada para você. 📄',
                type: 'text',
            };
            setMessages((prev) => [...prev, teamResponse]);
            setIsTyping(false);

            const readingTimer2 = setTimeout(() => {
              setIsTyping(true);

              const typingTimer2 = setTimeout(() => {
                const teamResponse2: Message = {
                  id: 3,
                  sender: 'team',
                  content: `🤔 Muitos banimentos acontecem sem análise humana detalhada.\nQuando o caso é apresentado da forma certa, a plataforma pode reavaliar a decisão.💡\n\nÉ exatamente nesse ponto que a equipe da DesbanX atua. 💪`,
                   type: 'text',
                };
                setMessages((prev) => [...prev, teamResponse2]);
                setIsTyping(false);

                 const readingTimer3 = setTimeout(() => {
                    setIsTyping(true);

                    const typingTimer3 = setTimeout(() => {
                        const teamResponse3: Message = {
                            id: 4,
                            sender: 'team',
                            content: 'Você deseja que a equipe da DesbanX inicie a análise completa do seu caso? 🤔',
                            type: 'text',
                        };
                        setMessages((prev) => [...prev, teamResponse3]);
                        setIsTyping(false);
                        setShowOptions(true);
                    }, 3000); 

                    return () => clearTimeout(typingTimer3);
                }, 6000); 
                
                return () => clearTimeout(readingTimer3);


              }, 3000);

              return () => clearTimeout(typingTimer2);
            }, 6000);

            return () => clearTimeout(readingTimer2);

        }, 3000); 

        return () => clearTimeout(typingTimer);
    }, 6000); 

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
        ? 'Sim, quero tentar recuperar minha conta 👍' 
        : 'Não, apenas estou me informando';
    
    const userMessage: Message = {
        id: Date.now(),
        sender: 'user',
        content,
        status: 'read',
        type: 'text',
    };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);
    setShowFinalOptions(false);

    if (option === 'sim') {
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                const finalResponse: Message = {
                    id: Date.now(),
                    sender: 'team',
                    content: 'Ótima escolha. ✅\n\nVocê está dando o passo que a maioria não dá: recorrer da forma correta. 🚀',
                    type: 'text',
                }
                setMessages(prev => [...prev, finalResponse]);
                setIsTyping(false);
                
                setTimeout(() => {
                    setShowImportantNotice(true);
                    
                    setTimeout(() => {
                        setIsTyping(true);
                        setTimeout(() => {
                            const finalMessage: Message = {
                                id: Date.now(),
                                sender: 'team',
                                content: 'Agora é o seguinte 👇\nSeu caso não é comum. Ele apresenta sinais claros de banimento automático: e esses são exatamente os casos que ainda valem a tentativa. ⚠️',
                                type: 'text',
                            };
                            setMessages(prev => [...prev, finalMessage]);
                            setIsTyping(false);

                            setTimeout(() => {
                              setIsTyping(true);
                              setTimeout(() => {
                                const proofMessage: Message = {
                                    id: Date.now(),
                                    sender: 'team',
                                    content: 'Várias pessoas chegaram até nós com o mesmo problema, achando que tinham perdido tudo.\nApós a análise e o processo feito pela DesbanX, muitas conseguiram recuperar suas contas. ✨',
                                    type: 'text',
                                };
                                setMessages(prev => [...prev, proofMessage]);
                                setIsTyping(false);

                                setTimeout(() => {
                                    setIsTyping(true);
                                    setTimeout(() => {
                                        const feedbackMessage: Message = {
                                            id: Date.now(),
                                            sender: 'team',
                                            content: 'Veja alguns feedbacks 👇',
                                            type: 'text',
                                        };
                                        setMessages(prev => [...prev, feedbackMessage]);
                                        setIsTyping(false);
                                        
                                        setTimeout(() => {
                                            const feedbackImages: Message = {
                                                id: Date.now(),
                                                sender: 'team',
                                                content: '', // Not used, but required by type
                                                type: 'feedback',
                                            };
                                            setMessages(prev => [...prev, feedbackImages]);

                                            setTimeout(() => {
                                                setIsTyping(true);
                                                setTimeout(() => {
                                                    const finalHook: Message = {
                                                        id: Date.now(),
                                                        sender: 'team',
                                                        content: 'A diferença não foi sorte.\nFoi recorrer do jeito certo, com quem sabe o que está fazendo. 💪',
                                                        type: 'text',
                                                    };
                                                    setMessages(prev => [...prev, finalHook]);
                                                    setIsTyping(false);

                                                    setTimeout(() => {
                                                        setIsTyping(true);
                                                        setTimeout(() => {
                                                            const urgencyMessage: Message = {
                                                                id: Date.now(),
                                                                sender: 'team',
                                                                content: 'Se você quer tentar recuperar sua conta enquanto ainda existe chance, esse é o momento. ⏳',
                                                                type: 'text',
                                                            };
                                                            setMessages(prev => [...prev, urgencyMessage]);
                                                            setIsTyping(false);
                                                            setShowPurchaseButton(true);
                                                        }, 3000);
                                                    }, 6000);
                                                }, 3000)
                                            }, 6000)
                                        }, 3000);

                                    }, 3000)
                                }, 6000)
                              }, 3000);
                            }, 6000);

                        }, 3000);
                    }, 6000);
                }, 1000); // 1s delay for the dialog to not feel instant
            }, 3000);
        }, 6000);
    } else {
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                const response1: Message = {
                    id: Date.now(),
                    sender: 'team',
                    content: 'Você tem certeza? Essa pode ser uma decisão irreversível. É crucial que você entenda uma coisa: banimentos automáticos são como uma sentença de culpa.',
                    type: 'text',
                };
                setMessages(prev => [...prev, response1]);
                setIsTyping(false);

                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        const response2: Message = {
                            id: Date.now() + 1,
                            sender: 'team',
                            content: 'Quando você NÃO RECORRE, o sistema entende que você está ACEITANDO A PUNIÇÃO. Ele marca seu caso como "resolvido", e suas chances de recuperação despencam para quase ZERO.',
                            type: 'text',
                        };
                        setMessages(prev => [...prev, response2]);
                        setIsTyping(false);

                        setTimeout(() => {
                            setIsTyping(true);
                            setTimeout(() => {
                                const response3: Message = {
                                    id: Date.now() + 2,
                                    sender: 'team',
                                    content: 'Não agir é a pior escolha. O tempo corre contra você. Esta é sua última chance real.',
                                    type: 'text',
                                };
                                setMessages(prev => [...prev, response3]);
                                setIsTyping(false);
                                setShowFinalOptions(true);
                            }, 3000);
                        }, 6000);
                    }, 3000);
                }, 6000);
            }, 3000);
        }, 6000);
    }
  }


  return (
    <>
      <AlertDialog open={showImportantNotice} onOpenChange={setShowImportantNotice}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" />
              Importante:
            </AlertDialogTitle>
            <AlertDialogDescription>
              Em casos de banimento automático, o tempo é um fator decisivo. Quanto antes o processo é iniciado, maiores são as chances de sucesso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowImportantNotice(false)} className="bg-primary hover:bg-primary/90">
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="bg-card border-b p-3 flex items-center gap-3">
              <Avatar>
                  <AvatarImage src="/logo2.png" alt="DEXBAN FF Logo" />
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
                  {messages.map((msg) => {
                      if (msg.type === 'feedback') {
                        return (
                            <div key={msg.id} className="max-w-xs mx-auto pt-4 space-y-4 animate-in fade-in-50 duration-500">
                                <Image src="/feedback1.jpg" alt="Feedback de cliente 1" width={400} height={800} className="rounded-lg object-contain" />
                                <Image src="/feedback2.jpg" alt="Feedback de cliente 2" width={400} height={800} className="rounded-lg object-contain" />
                            </div>
                        )
                      }
                      return (
                      <div
                          key={msg.id}
                          className={cn(
                          'flex items-end gap-2',
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          )}
                      >
                          {msg.sender === 'team' && (
                              <Avatar className="h-8 w-8">
                                  <AvatarImage src="/logo2.png" alt="DEXBAN FF Logo" />
                                  <AvatarFallback>DX</AvatarFallback>
                              </Avatar>
                          )}
                          <div
                              className={cn(
                                'rounded-lg p-3 text-white max-w-[85%] md:max-w-lg',
                                msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                              )}
                              >
                              <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                              {msg.sender === 'user' && (
                                <div className="flex justify-end items-center gap-1 mt-1">
                                    <MessageStatus status={msg.status} />
                                </div>
                              )}
                          </div>
                      </div>
                  )})}
                  
                  {isTyping && (
                       <div className="flex items-end gap-2 justify-start">
                          <Avatar className="h-8 w-8">
                              <AvatarImage src="/logo2.png" alt="DEXBAN FF Logo" />
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
                          Sim, quero tentar recuperar minha conta 👍
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
              {showPurchaseButton && (
                  <div className="flex justify-center max-w-4xl mx-auto animate-in fade-in-50 duration-500">
                      <Button
                          asChild
                          size="lg"
                          className="w-full sm:w-auto font-bold relative overflow-hidden
                                     before:absolute before:inset-0
                                     before:-translate-x-full
                                     before:animate-shine
                                     before:bg-gradient-to-r
                                     before:from-transparent before:via-white/50 before:to-transparent"
                      >
                          <Link href="https://chk.eduzz.com/1W3ZA6VQW2" target="_blank">
                            Quero Recuperar Minha Conta
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                      </Button>
                  </div>
              )}
               {showFinalOptions && (
                  <div className="flex flex-col sm:flex-row gap-2 max-w-4xl mx-auto animate-in fade-in-50 duration-500">
                       <Button 
                          onClick={() => handleOptionClick('sim')}
                          className="font-bold flex-1"
                       >
                            Me Arrependi, quero recuperar!
                           <ArrowRight className="ml-2 h-5 w-5" />
                       </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Desistir e Perder a Conta
                            </Link>
                        </Button>
                  </div>
              )}
          </div>
      </div>
    </>
  );
}
