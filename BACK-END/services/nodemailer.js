const nodemailer = require('nodemailer'); // Importer le package Nodemailer
const ENV = require('../config/Env.js');

const transporter = nodemailer.createTransport({
  // Configuration du serveur SMTP de Gmail
  host: "smtp.gmail.com",
  // Port standard pour TLS
  port: 587,
  // false pour TLS (port 587), true pour SSL (port 465)
  secure: false,
  // Authentification avec les identifiants Gmail
  auth: {
    // l'email configuré dans .env
    user: ENV.EMAIL_USER,
    // mot de passe configuré dans .env 
    pass: ENV.EMAIL_PASS,
  },
});

// Cette fonction va nous permettre d'envoyer un email de vérification
// C'est super important pour s'assurer que l'utilisateur 
// a bien accès à l'email qu'il a renseigné!
const sendEmail = async (user, verifieToken) => {
  // On crée un lien de vérification que l'utilisateur pourra cliquer
  // Le ${verifieToken} sera remplacé par le vrai token généré précédemment
  const verificationLink = `http://localhost:5173/verify/${verifieToken}`;

  // Maintenant, on va utiliser notre configuration nodemailer pour envoyer l'email
  // C'est comme envoyer une lettre, mais en version numérique! 📧

  await transporter.sendMail({
    // C'est nous qui envoyons l'email (comme l'adresse de l'expéditeur)
    from: ENV.EMAIL_USER,
    // L'adresse email de notre nouvel utilisateur
    to: user.email,
    // Le sujet du mail (ce que verra l'utilisateur en premier)
    subject: "Vérifiez votre email",

    // Le message en version texte simple (au cas où l'HTML ne marche pas)
    text: `Hello ${user.prenom},\n\nMerci de vous être inscrit\n\nCordialement.`,

    // La version en HTML avec notre lien de vérification
    html: `
    <h1>Bienvenue ${user.prenom} !</h1>
      <p>Merci de vous être inscrit. Veuillez cliquer sur le lien ci-dessous pour vérifier votre email :</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Vérifier mon email
      </a>
      <p>Ou copiez ce lien dans votre navigateur :</p>
      <p>${verificationLink}</p>
      <p>Ce lien expire dans 24 heures.</p>`,
  });
};

const sendOrderConfirmationEmail = async (user, commande) => {
  const orderDetails = commande.items.map(item => {
    const productName = item.product?.nom || item.product?.name;
    return `
    <li>
      <strong>${productName}</strong> (x${item.quantity} - ${item.product.price} €
    </li>`}).join('');

  await transporter.sendMail({
    from: ENV.EMAIL_USER,
    to: user.email,
    subject: `Confirmation de votre commande #${commande._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Merci pour votre commande, ${user.prenom} !</h2>
        <p>Nous avons bien reçu votre commande et elle est en cours de traitement.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
          <h3>Récapitulatif de la commande :</h3>
          <ul>
            ${orderDetails}
          </ul>
          <hr />
          <p><strong>Total payé : ${commande.totalPrice} €</strong></p>
        </div>

        <p>Vous recevrez un email dès que votre colis sera expédié.</p>
        <p>Cordialement,<br />L'équipe E-commerce</p>
      </div>
    `,
  });
}

module.exports = { sendEmail, sendOrderConfirmationEmail };