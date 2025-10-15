import { Award, Shield, Wrench, Truck } from "lucide-react";

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
      icon: Truck,
      title: "Livraison & Assistance",
      description: "Livraison à domicile et assistance 24/7 partout au Gabon",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="section-title">Pourquoi Choisir <span className="text-orange-600 uppercase font-bold">PRESTIGE car luxe</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nous nous engageons à vous offrir une expérience d'achat automobile exceptionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(25,100%,50%,0.15)] group animate-fade-in hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
