import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Award, Target, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Nous nous engageons à offrir uniquement des véhicules et services de la plus haute qualité",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Notre passion pour l'automobile se reflète dans chaque interaction avec nos clients",
    },
    {
      icon: Target,
      title: "Intégrité",
      description: "Transparence et honnêteté dans toutes nos transactions et relations commerciales",
    },
    {
      icon: Users,
      title: "Service Client",
      description: "La satisfaction de nos clients est au cœur de tout ce que nous faisons",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">À Propos de Nous</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Votre partenaire de confiance pour l'excellence automobile depuis plus de 15 ans
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Notre Histoire</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  Fondée avec la vision de révolutionner l'expérience d'achat automobile en Afrique,
                  Général Business Car s'est rapidement imposée comme un leader dans la distribution
                  de véhicules premium.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  Notre mission est simple : offrir à nos clients une sélection exceptionnelle de
                  véhicules de qualité supérieure, accompagnée d'un service client incomparable et
                  de solutions de financement flexibles adaptées à chaque situation.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  Au fil des années, nous avons bâti notre réputation sur la confiance, la transparence
                  et l'excellence. Chaque membre de notre équipe partage la même passion pour l'automobile
                  et le même engagement envers la satisfaction de nos clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-xl text-muted-foreground">
                Les principes qui guident chacune de nos actions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-all duration-500 group hover:shadow-[0_0_40px_hsl(25,100%,50%,0.15)] animate-fade-in hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <value.icon className="w-7 h-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "15+", label: "Années d'Expérience" },
                { number: "5000+", label: "Clients Satisfaits" },
                { number: "500+", label: "Véhicules Vendus/An" },
                { number: "98%", label: "Taux de Satisfaction" },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in hover:scale-110 transition-transform duration-500 cursor-default"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2 transition-all duration-500 hover:scale-125">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground hover:text-foreground transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Équipe</h2>
              <p className="text-lg text-muted-foreground">
                Une équipe de professionnels passionnés et expérimentés, dédiée à vous offrir
                la meilleure expérience d'achat automobile. De nos conseillers commerciaux à
                nos techniciens certifiés, chaque membre de notre équipe est formé pour répondre
                à vos besoins avec expertise et professionnalisme.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
