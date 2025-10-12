import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-none">PANAFRIQUE</span>
                <span className="text-sm text-accent font-semibold leading-none">MOTORS</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Votre partenaire de confiance pour l'achat de véhicules premium et services automobiles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/stock" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Notre Stock
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Financement
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Vente de véhicules neufs</li>
              <li>Véhicules d'occasion</li>
              <li>Entretien et réparation</li>
              <li>Solutions de financement</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-accent mt-1" />
                <span className="text-muted-foreground text-sm">+242 XX XXX XXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-accent mt-1" />
                <span className="text-muted-foreground text-sm">contact@panafrique-motors.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <span className="text-muted-foreground text-sm">Brazzaville, Congo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PANAFRIQUE MOTORS. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
