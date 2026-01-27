'use client';

import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Send, Percent } from 'lucide-react';

export default function AdminPage() {
  const stats = [
    {
      title: 'Visitantes Totais',
      value: '1,254',
      icon: <Users className="w-8 h-8 text-primary" />,
      change: '+12% vs. mês passado',
    },
    {
      title: 'Análises Iniciadas',
      value: '487',
      icon: <FileText className="w-8 h-8 text-primary" />,
      change: '+8% vs. mês passado',
    },
    {
      title: 'Apelações Geradas',
      value: '312',
      icon: <Send className="w-8 h-8 text-primary" />,
      change: '+15% vs. mês passado',
    },
    {
        title: 'Taxa de Conversão',
        value: '24.9%',
        icon: <Percent className="w-8 h-8 text-primary" />,
        change: '+2.1% vs. mês passado',
      },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Painel do Administrador</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Estatísticas de uso da plataforma.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in-50 duration-1000">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
