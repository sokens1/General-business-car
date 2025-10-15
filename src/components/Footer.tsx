import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img 
                src="/assets/logo-prestige.png" 
                alt="PRESTIGE car luxe" 
                className="h-28 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Votre partenaire de confiance pour l'achat de véhicules premium et services automobiles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-black mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/stock" className="text-gray-600 hover:text-orange-600 transition-colors text-sm">
                  Notre Stock
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-orange-600 transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orange-600 transition-colors text-sm">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-black mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Vente de véhicules neufs</li>
              <li>Véhicules d'occasion</li>
              <li>Entretien et réparation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-black mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-orange-600 mt-1" />
                <span className="text-gray-600 text-sm">+241 XX XXX XXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-orange-600 mt-1" />
                <span className="text-gray-600 text-sm">contact@prestige-car-luxe.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-600 mt-1" />
                <span className="text-gray-600 text-sm">Libreville, Gabon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} PRESTIGE car luxe. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
