import { NextRequest, NextResponse } from 'next/server';

// Mock de slugs já utilizados (em produção, isto viria da base de dados)
const usedSlugs = [
  'padaria-do-joao',
  'mercearia-central',
  'hortifruti-maria',
  'farmacia-bairro',
  'cafe-central',
  'restaurante-sabor',
  'loja-conveniencia',
  'supermercado-local'
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug é obrigatório' },
        { status: 400 }
      );
    }

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));

    // Verificar se o slug está disponível
    const isAvailable = !usedSlugs.includes(slug.toLowerCase());

    return NextResponse.json({
      slug,
      available: isAvailable,
      message: isAvailable ? 'Slug disponível' : 'Slug já está em uso'
    });

  } catch (error) {
    console.error('Erro ao verificar slug:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
