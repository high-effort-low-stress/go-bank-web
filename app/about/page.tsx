import { ShieldIcon, TargetIcon, UsersIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header
        navItems={[
          { title: "Missão e Visão", href: "#mission-vision" },
          { title: "Valores", href: "#values" },
          { title: "Nossa História", href: "#story" },
          { title: "Conheça a Equipe", href: "#team" },
          { title: "Contato", href: "#contact" },
        ]}
        buttons={[
          { title: "Voltar", href: "/", variant: "link" },
          { title: "Quero ser um GoClient", href: "/register" },
        ]}
      />
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl tracking-tight">
            Reimaginando os serviços bancários para a era digital
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos construindo o futuro dos serviços financeiros com foco em
            simplicidade, segurança e uma experiência de usuário excepcional.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="border-t border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                <TargetIcon />
              </div>
              <h2>Nossa Missão</h2>
              <p className="text-muted-foreground">
                Para democratizar o acesso aos serviços financeiros e capacitar
                os indivíduos com as ferramentas de que necessitam para alcançar
                a liberdade financeira. Acreditamos que o sistema bancário deve
                ser simples, transparente e acessível a todos.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                <ZapIcon />
              </div>
              <h2>Nossa Visão</h2>
              <p className="text-muted-foreground">
                Para nos tornarmos o banco digital mais confiável globalmente,
                conhecido pela inovação, segurança e soluções centradas no
                cliente. Estamos construindo uma plataforma que se adapta às
                suas necessidades e cresce com você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2>Nossos Valores</h2>
              <p className="text-muted-foreground mt-4">
                Os princípios que guiam tudo o que fazemos
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border">
                  <ShieldIcon />
                </div>
                <h3>Segurança em Primeiro Lugar</h3>
                <p className="text-muted-foreground">
                  Sua segurança é a nossa principal prioridade. Usamos
                  criptografia de nível bancário e autenticação multifator para
                  manter seus dados seguros.
                </p>
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border">
                  <UsersIcon />
                </div>
                <h3>Comunidade e Cliente em Primeiro Lugar</h3>
                <p className="text-muted-foreground">
                  Ouvimos nossos clientes e melhoramos continuamente com base em
                  seus feedbacks e necessidades.
                </p>
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border">
                  <ZapIcon />
                </div>
                <h3>Inovação</h3>
                <p className="text-muted-foreground">
                  Estamos constantemente ultrapassando os limites para trazer a
                  você o que há de mais moderno em tecnologia e serviços
                  financeiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="border-t border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div className="space-y-6">
              <h2>Nossa História</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fundado em 2025, o GoBank nasceu de uma ideia simples: o banco
                  deveria ser tão fácil quanto usar seu aplicativo favorito.
                </p>
                <p>
                  Nossos fundadores, frustrados com as limitações bancárias
                  tradicionais, decidiram criar uma plataforma financeira que
                  colocasse os usuários em primeiro lugar. Começando com apenas
                  um aplicativo móvel e uma visão, crescemos para atender mais
                  de 2 milhões de clientes em todo o mundo.
                </p>
                <p>
                  Nossa jornada é marcada por um compromisso inabalável com a
                  excelência e a satisfação do cliente. Continuamos a inovar e
                  expandir nossos serviços, sempre com o objetivo de tornar a
                  gestão financeira mais fácil e acessível para todos.
                </p>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={"/go-bank-logo.png"}
                alt="Modern office workspace"
                className="w-full h-full object-cover"
                width={800}
                height={800}
                placeholder="blur"
                blurDataURL="/go-bank-logo.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-3xl md:text-4xl">2M+</div>
              <div className="text-muted-foreground mt-2">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl">$5B+</div>
              <div className="text-muted-foreground mt-2">Transactions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl">150+</div>
              <div className="text-muted-foreground mt-2">Team Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl">4.9★</div>
              <div className="text-muted-foreground mt-2">App Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="border-t border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2>Equipe de Liderança</h2>
              <p className="text-muted-foreground mt-4">
                Conheça as pessoas que lideram o GoBank para o futuro.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Caio Cesar",
                  role: "CTO & Co-Founder",
                  image: "/caio-cto-co-founder.png",
                },
                {
                  name: "Iago da Silva",
                  role: "CEO & Co-Founder",
                  image: "/iago-ceo-cofounder.png",
                },
              ].map((member) => (
                <div key={member.name} className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                      placeholder="blur"
                      blurDataURL="/go-bank-logo.png"
                    />
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="border-t border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2>Junte-se a nós em nossa missão</h2>
            <p className="text-muted-foreground">
              Estamos sempre em busca de indivíduos talentosos que compartilhem
              nossa paixão por inovação e atendimento ao cliente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="#careers"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-11 px-8 hover:bg-primary/90 transition-colors"
              >
                Veja as vagas
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background h-11 px-8 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Entre em Contato Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
