'use client';

import Header from '@/components/header';
import ChatInterface from '@/components/chat-interface';
import { Suspense } from 'react';

function ChatPageContent() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Header />
      <main className="flex-grow flex flex-col">
        <ChatInterface />
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
