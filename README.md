# Projet-BDL
Ce projet a été conçu de A & Z par moi et a présenter devant un Jury lors de ma soutenance de fin de Cursus.
Il représente un site de e-commerce fictif autour du basketball

Ce projet est composé de deux parties :
🖥️ Back-end : API Node.js / Express / MongoDB
💻 Front-end : React (Vite)
⚙️ Configuration du Back-end


📂 1. Accéder au dossier du back-end
Ouvre un terminal et exécute :

cd back-end

🧾 2. Créer le fichier .env
Crée un fichier nommé .env à la racine du dossier back-end, puis ajoute les variables suivantes :

# PORT SERVER
PORT=8000

# MONGO
MONGO_URI='mongodb://localhost:27017'
DB_NAME='veville'

# JWT
JWT_SECRET=ton_secret_jwt
JWT_EXPIRES_IN=1d

# Email 
EMAIL_USER=ton_email@example.com
EMAIL_PASS=ton_mot_de_passe

# CORS (autorise les appels depuis le front)
WEB_APP_URL=http://localhost:5173
DOMAINE_URL=http://localhost:5173
⚠️ Important : Remplace les valeurs (ton_secret_jwt, ton_email, etc.) par tes vraies informations avant de lancer le serveur.

📦 3. Installer les dépendances du back-end
Toujours dans le dossier back-end, exécute :

npm install

🚀 4. Lancer le serveur back-end
npm start
Le serveur s'exécutera sur :
👉 http://localhost:8000

💻 Configuration du Front-end
📂 1. Accéder au dossier du front-end
cd front-end

📦 2. Installer les dépendances du front-end
npm install

🚀 3. Lancer le serveur front-end
npm run dev

Le front-end s'exécutera sur :
👉 http://localhost:5173

✅ Résumé
Une fois les deux serveurs lancés :

Back-end : http://localhost:8000
Front-end : http://localhost:5173
