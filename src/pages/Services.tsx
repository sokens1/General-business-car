import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Shield, Calendar, Car, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useServices } from "@/hooks/useServices";

const Services = () => {
  const { data: servicesData, isLoading } = useServices();

  // Mapping des noms d'icônes aux composants Lucide
  const iconMap: Record<string, any> = {
    Wrench,
    Shield,
    Calendar,
    Car,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Nos Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Une gamme complète de services pour accompagner tous vos besoins automobiles,
              de l'achat à l'entretien de votre véhicule
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des services...</p>
              </div>
            ) : servicesData && servicesData.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {servicesData.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Car;
                  return (
                    <div
                      key={service.id}
                      className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(45,100%,55%,0.15)] group animate-fade-in hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                    >
                      <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <IconComponent className="w-8 h-8 text-accent transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">{service.title}</h2>
                      <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm transition-all duration-300 hover:translate-x-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 transition-transform duration-300 hover:scale-150" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun service disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Besoin d'un Service ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contactez-nous dès aujourd'hui pour planifier votre rendez-vous ou obtenir plus d'informations
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="btn-gold">
                    PRENDRE RENDEZ-VOUS
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    NOUS CONTACTER
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
