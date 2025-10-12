import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, FileText, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Financing = () => {
  const benefits = [
    "Taux d'intérêt compétitifs",
    "Approbation rapide en 48h",
    "Apport initial flexible",
    "Durées de remboursement de 12 à 84 mois",
    "Solutions adaptées à tous les profils",
    "Accompagnement personnalisé",
  ];

  const steps = [
    {
      icon: FileText,
      title: "Soumettez votre demande",
      description: "Remplissez notre formulaire en ligne ou contactez-nous directement",
    },
    {
      icon: Calculator,
      title: "Étude de votre dossier",
      description: "Notre équipe analyse votre situation et vous propose les meilleures options",
    },
    {
      icon: CreditCard,
      title: "Approbation & Signature",
      description: "Une fois approuvé, finalisez votre dossier et prenez possession de votre véhicule",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Solutions de Financement</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des options de financement flexibles pour concrétiser votre projet automobile
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Pourquoi Choisir Notre Financement ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-card p-4 rounded-lg border border-border"
                  >
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-6 text-center">Simulateur de Financement</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prix du véhicule</label>
                  <input
                    type="number"
                    placeholder="75 000 €"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Apport initial</label>
                  <input
                    type="number"
                    placeholder="15 000 €"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Durée (mois)</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none">
                    <option>12 mois</option>
                    <option>24 mois</option>
                    <option>36 mois</option>
                    <option>48 mois</option>
                    <option>60 mois</option>
                    <option>72 mois</option>
                    <option>84 mois</option>
                  </select>
                </div>
                <div className="pt-6 pb-4 px-6 bg-accent/10 rounded-lg border-2 border-accent/30">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Mensualité estimée</p>
                    <p className="text-4xl font-bold text-accent">~1 250 €</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Estimation indicative, taux d'intérêt variable selon profil
                    </p>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="w-full btn-gold mt-4">
                    DEMANDER UN FINANCEMENT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Comment Ça Marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-3">{index + 1}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Prêt à Démarrer Votre Projet ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Notre équipe est disponible pour vous accompagner dans votre demande de financement
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="btn-gold">
                    FAIRE UNE DEMANDE
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    PARLER À UN CONSEILLER
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

export default Financing;
