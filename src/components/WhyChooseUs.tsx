import { Award, Shield, Wrench, DollarSign } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Sélection Premium",
      description: "Une gamme exclusive de véhicules haut de gamme soigneusement sélectionnés",
    },
    {
      icon: Shield,
      title: "Garantie & Confiance",
      description: "Tous nos véhicules sont certifiés avec garantie complète",
    },
    {
      icon: Wrench,
      title: "Service Expert",
      description: "Entretien et réparation par des techniciens qualifiés",
    },
    {
      icon: DollarSign,
      title: "Financement Flexible",
      description: "Solutions de financement adaptées à votre budget",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Pourquoi Choisir PANAFRIQUE MOTORS</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nous nous engageons à vous offrir une expérience d'achat automobile exceptionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(45,100%,55%,0.1)] group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
