## ⚙️ Configuration

Le fichier `.env` est déjà présent dans le projet.  
Assurez-vous de configurer correctement vos variables d’environnement pour la base de données, l’authentification et le CORS, EMAIL etc.  

## Installation des dépendances

Avant de lancer le projet, installez les packages nécessaires :

```bash
npm install express mongoose cors cookie-parser bcrypt dotenv nodemailer jsonwebtoken multer

### 📦 Packages utilisés

- **express** → Framework pour créer le serveur et gérer les routes.  
- **mongoose** → ODM pour interagir avec MongoDB.  
- **cors** → Gérer les requêtes cross-origin (CORS).  
- **cookie-parser** → Lire et manipuler les cookies.  
- **bcrypt** → Hasher les mots de passe.  
- **dotenv** → Charger les variables d’environnement.  
- **nodemailer** → Envoi d’emails.  
- **jsonwebtoken** → Gestion des tokens JWT pour l’authentification.  
- **multer** → Gestion de l’upload de fichiers.  