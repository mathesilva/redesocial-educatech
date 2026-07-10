/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Card,
  Badge,
  Tag,
  UploadZone,
  Avatar,
  Alert,
  Pagination,
} from "./DesignSystem";
import {
  Palette,
  Type,
  LayoutGrid,
  Layers,
  Sparkles,
  Info,
  MessageSquare,
  Award,
  Brain,
  Trash2,
  ShieldCheck,
  Eye,
  Smartphone,
  Monitor,
  FileText,
} from "lucide-react";

export const DesignSystemShowcase: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [selectVal, setSelectVal] = useState("math");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [radioVal, setRadioVal] = useState("aluno");
  const [showAlert, setShowAlert] = useState(true);

  // Swatches for the Color Palette
  const swatches = [
    {
      name: "Primária (Educação/Confiança)",
      hex: "#2563EB",
      bg: "bg-[#2563EB]",
      text: "text-white",
      desc: "Cor de ação principal, links e botões em destaque.",
    },
    {
      name: "Secundária (Gamificação/Aviso)",
      hex: "#FBBF24",
      bg: "bg-[#FBBF24]",
      text: "text-slate-900",
      desc: "Moedas, XP, conquistas e elementos interativos de recompensa.",
    },
    {
      name: "Background (Leveza)",
      hex: "#F8FAFC",
      bg: "bg-[#F8FAFC]",
      border: "border border-slate-200",
      text: "text-slate-800",
      desc: "Fundo limpo que reduz a fadiga visual.",
    },
    {
      name: "Cards (Contraste)",
      hex: "#FFFFFF",
      bg: "bg-[#FFFFFF]",
      border: "border border-slate-100",
      text: "text-slate-800",
      desc: "Fundo para blocos de conteúdo e formulários.",
    },
    {
      name: "Texto Principal",
      hex: "#1E293B",
      bg: "bg-[#1E293B]",
      text: "text-white",
      desc: "Altamente legível, tom cinza-escuro (não preto puro).",
    },
    {
      name: "Texto Secundário",
      hex: "#64748B",
      bg: "bg-[#64748B]",
      text: "text-white",
      desc: "Legendas, metadados e informações acessórias.",
    },
    {
      name: "Sucesso",
      hex: "#22C55E",
      bg: "bg-[#22C55E]",
      text: "text-white",
      desc: "Atividades aprovadas e recompensas coletadas.",
    },
    {
      name: "Erro",
      hex: "#EF4444",
      bg: "bg-[#EF4444]",
      text: "text-white",
      desc: "Erros de formulário, campos obrigatórios inválidos.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="border-b border-slate-100 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8 text-brand-primary" />
          <h1 className="text-3xl font-bold text-brand-text-main tracking-tight font-sans">
            Design System & Case UX/UI
          </h1>
        </div>
        <p className="text-brand-text-sub text-base max-w-3xl leading-relaxed">
          Um guia visual completo das decisões de design, paleta de cores,
          tipografia, espaçamentos, e componentes interativos construídos sob
          medida para a **Rede Social Educatech**.
        </p>
      </div>

      {/* Grid 1: Paleta de Cores e Tipografia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Swatches */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Palette className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text-main">
              Paleta de Cores (WCAG AA)
            </h2>
          </div>
          <p className="text-sm text-brand-text-sub leading-relaxed">
            Cores selecionadas para proporcionar excelente contraste visual
            (compatível com a norma de acessibilidade WCAG AA) e transmitir
            seriedade Educatech equilibrada com diversão gamificada.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {swatches.map((color, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-100 rounded-xl overflow-hidden shadow-xs bg-white"
              >
                <div
                  className={`h-12 w-full ${color.bg} ${color.border || ""} flex items-center justify-between px-3`}
                >
                  <span
                    className={`text-xs font-mono font-bold tracking-wider ${color.text}`}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-brand-text-main">
                    {color.name}
                  </h4>
                  <p className="text-[11px] text-brand-text-sub leading-tight">
                    {color.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tipografia */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Type className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text-main">
              Tipografia & Escala
            </h2>
          </div>
          <p className="text-sm text-brand-text-sub leading-relaxed">
            Utilizamos a família tipográfica **Inter** para a interface inteira,
            variando pesos e tamanhos para estabelecer uma hierarquia de leitura
            rápida e moderna.
          </p>

          <div className="space-y-4 font-sans">
            <div className="border-b border-slate-50 pb-3">
              <span className="text-xs font-mono text-brand-primary">
                Título - 32px Bold
              </span>
              <h1 className="text-3xl font-bold text-brand-text-main mt-1 tracking-tight">
                O aprendizado começa com curiosidade
              </h1>
            </div>

            <div className="border-b border-slate-50 pb-3">
              <span className="text-xs font-mono text-brand-primary">
                Subtítulo - 24px Semibold
              </span>
              <h2 className="text-2xl font-semibold text-brand-text-main mt-1">
                Sua dose diária de conhecimento
              </h2>
            </div>

            <div className="border-b border-slate-50 pb-3">
              <span className="text-xs font-mono text-brand-primary">
                Texto Principal - 16px Regular
              </span>
              <p className="text-base text-brand-text-main mt-1 leading-relaxed">
                Com a plataforma Rede Social Educatech, estudantes de todo o
                Brasil podem compartilhar dúvidas, realizar missões práticas
                enviadas pelos professores e ganhar pontos de XP.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-brand-primary">
                Legenda / Metadado - 14px Medium
              </span>
              <p className="text-sm font-medium text-brand-text-sub mt-1">
                Postado há 2 horas por Prof. Lucas Rocha em Física
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid 2: Formulários e Botões Interativos */}
      <Card className="space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
          <Sparkles className="w-5 h-5 text-brand-primary" />
          <h2 className="text-lg font-bold text-brand-text-main">
            Formulários & Componentes de Ação
          </h2>
        </div>
        <p className="text-sm text-brand-text-sub leading-relaxed">
          Para evitar que telas com formulários (como Cadastro, Criar
          Publicação) pareçam exaustivas, usamos rótulos discretos, espaçamento
          generoso e elementos arredondados modernos de 12px a 16px.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Botões */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Botões & Variações
            </h3>
            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-brand-text-sub font-mono">
                  Primário
                </span>
                <Button variant="primary" className="w-full">
                  Ação Principal
                </Button>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-brand-text-sub font-mono">
                  Secundário
                </span>
                <Button variant="secondary" className="w-full">
                  Coletar Pontos
                </Button>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-brand-text-sub font-mono">
                  Outline / Auxiliar
                </span>
                <Button variant="outline" className="w-full">
                  Cancelar Envio
                </Button>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-brand-text-sub font-mono">
                  Perigo / Deletar
                </span>
                <Button variant="danger" className="w-full">
                  Excluir Postagem
                </Button>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Inputs & Estados
            </h3>
            <div className="space-y-3">
              <Input
                label="Nome Completo (Padrão)"
                placeholder="Ex: Beatriz Silveira"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Select
                label="Escolha a Disciplina"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: "math", label: "Matemática" },
                  { value: "physics", label: "Física" },
                  { value: "history", label: "História" },
                  { value: "biology", label: "Biologia" },
                ]}
              />
              <Input
                label="E-mail (Estado de Erro)"
                placeholder="Digite seu e-mail"
                error="Este formato de e-mail é inválido."
                defaultValue="thiago.alencar@"
              />
            </div>
          </div>

          {/* Checks, Radios & Avatares */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Seletores & Avatares
            </h3>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl">
              <Checkbox
                id="check-1"
                label="Lembrar meu usuário neste dispositivo"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
              />
              <Checkbox
                id="check-2"
                label="Aceito os Termos Educacionais"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
              />
            </div>

            <div className="flex gap-4">
              <Radio
                id="radio-student"
                name="user-role-opt"
                label="Sou Aluno"
                checked={radioVal === "aluno"}
                onChange={() => setRadioVal("aluno")}
              />
              <Radio
                id="radio-teacher"
                name="user-role-opt"
                label="Sou Professor"
                checked={radioVal === "professor"}
                onChange={() => setRadioVal("professor")}
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-brand-text-sub block">
                Avatares da Plataforma (Anel de Identidade)
              </span>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col items-center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    alt="Aluno"
                    level={5}
                    role="student"
                  />
                  <span className="text-[10px] text-brand-text-sub mt-1">
                    Aluno (Azul)
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                    alt="Professor"
                    role="teacher"
                  />
                  <span className="text-[10px] text-brand-text-sub mt-1">
                    Prof. (Dourado)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid 3: Elementos de Gamificação & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Badges, Tags, Upload */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Award className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text-main">
              Gamificação & Categorias
            </h2>
          </div>
          <p className="text-sm text-brand-text-sub leading-relaxed">
            Medalhas (badges) elegantes e tags de matérias para promover
            engajamento natural e diversão sem parecer infantil.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-brand-text-sub block">
                Tags de Disciplina (Color-coded)
              </span>
              <div className="flex flex-wrap gap-2">
                <Tag subject="Matemática" />
                <Tag subject="Física" />
                <Tag subject="Química" />
                <Tag subject="Ciências" />
                <Tag subject="História" />
                <Tag subject="Redação" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-brand-text-sub block">
                Variações de Badges de Estado
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Disponível</Badge>
                <Badge variant="secondary">Em Progresso</Badge>
                <Badge variant="success">Aprovado</Badge>
                <Badge variant="danger">Não Realizado</Badge>
                <Badge variant="slate">Nível 10</Badge>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-brand-text-sub block">
                Medalhas de Conquista Destravadas
              </span>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 p-2 bg-amber-50/50 border border-amber-100 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-brand-text-main">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text-main">
                      Cérebro de Ferro
                    </h5>
                    <p className="text-[10px] text-brand-text-sub">
                      100% em Exatas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-purple-50/50 border border-purple-100 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text-main">
                      Líder Semanal
                    </h5>
                    <p className="text-[10px] text-brand-text-sub">
                      Top 1 do Ranking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Upload Zone & Feedbacks */}
        <Card className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <Info className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text-main">
              Área de Upload & Alertas
            </h2>
          </div>
          <p className="text-sm text-brand-text-sub leading-relaxed">
            Componente para envio de arquivos de suporte ou respostas das
            missões, com estado intuitivo de arrastar-e-soltar.
          </p>

          <UploadZone
            onFileSelect={(file) => console.log("File selected:", file)}
          />

          <div className="space-y-2">
            {showAlert && (
              <Alert
                type="success"
                title="Missão Concluída com Sucesso!"
                description="Você ganhou 150 pontos de XP e 30 moedas de ouro para usar em conquistas!"
              />
            )}
          </div>
        </Card>
      </div>

      {/* Grid 4: Grid de 12 Colunas & Diretrizes de Layout */}
      <Card className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
          <LayoutGrid className="w-5 h-5 text-brand-primary" />
          <h2 className="text-lg font-bold text-brand-text-main">
            Grid Responsiva de 12 Colunas & Acessibilidade
          </h2>
        </div>
        <p className="text-sm text-brand-text-sub leading-relaxed">
          Toda a plataforma se organiza dinamicamente em uma **Grid de 12
          Colunas** no Desktop para manter o ritmo visual estruturado, com uma
          barra lateral de navegação fixa, e se reorganiza para um fluxo
          vertical de coluna única com **Bottom Navigation** no Mobile.
        </p>

        <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono font-semibold text-brand-primary">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="col-span-1 bg-blue-50 py-3 rounded-lg border border-blue-100 flex items-center justify-center"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-success" />
              <h4 className="text-sm font-bold text-brand-text-main">
                WCAG AA Compliant
              </h4>
            </div>
            <p className="text-xs text-brand-text-sub leading-relaxed">
              Tamanhos de fonte e contrastes de cor testados para manter a
              legibilidade máxima, suportando leitores de tela e navegação por
              teclado.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-brand-primary" />
              <h4 className="text-sm font-bold text-brand-text-main">
                Desktop Layout (Fixa)
              </h4>
            </div>
            <p className="text-xs text-brand-text-sub leading-relaxed">
              Barra lateral fixa de 260px contendo links diretos, perfil
              resumido do aluno e atalhos rápidos. Header superior com
              notificações sempre visível.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-secondary" />
              <h4 className="text-sm font-bold text-brand-text-main">
                Mobile Bottom Navigation
              </h4>
            </div>
            <p className="text-xs text-brand-text-sub leading-relaxed">
              No mobile, a barra lateral é ocultada e substituída por um menu
              inferior compacto, facilitando o toque com o polegar (zona de
              alcance ergonômico).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
