import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extrair dados do FormData
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const slogan = formData.get('slogan') as string;
    const description = formData.get('description') as string;
    const theme = formData.get('theme') as string;
    const primaryColor = formData.get('primaryColor') as string;
    const logo = formData.get('logo') as File | null;
    const favicon = formData.get('favicon') as File | null;

    // Validação básica
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Nome e slug são obrigatórios' },
        { status: 400 }
      );
    }

    // Simular processamento de upload de ficheiros
    let logoUrl = null;
    let faviconUrl = null;

    if (logo) {
      // Em produção, aqui faria upload para CDN/S3
      logoUrl = `/uploads/logos/${Date.now()}-${logo.name}`;
      console.log('Logo uploaded:', logo.name, logo.size, 'bytes');
    }

    if (favicon) {
      // Em produção, aqui faria upload para CDN/S3
      faviconUrl = `/uploads/favicons/${Date.now()}-${favicon.name}`;
      console.log('Favicon uploaded:', favicon.name, favicon.size, 'bytes');
    }

    // Simular criação da loja na base de dados
    const storeId = `store_${Date.now()}`;
    
    const store = {
      id: storeId,
      name,
      slug,
      slogan: slogan || null,
      description: description || null,
      theme,
      primaryColor,
      logoUrl,
      faviconUrl,
      createdAt: new Date().toISOString(),
      status: 'active',
      settings: {
        currency: 'EUR',
        timezone: 'Europe/Lisbon',
        language: 'pt-PT'
      }
    };

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Store created:', store);

    return NextResponse.json({
      success: true,
      storeId,
      store,
      message: 'Loja criada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao criar loja:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
