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
    const frontendUrl = ENV.FRONTEND_URL || ENV.WEB_APP_URL;
    const verificationLink = `${frontendUrl}/verify/${verifieToken}`;

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
      <div style="background-color: #f4f4f4; padding: 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        
        <tr>
            <td align="center" style="padding: 40px 20px; background-color: #552583;">
                <h1 style="color: #FDB927; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; font-weight: 900;">
                    Ball Don't Lie
                </h1>
                <div style="height: 4px; width: 40px; background-color: #FDB927; margin-top: 10px;"></div>
            </td>
        </tr>

        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #333; margin-top: 0;">Merci pour votre commande, ${user.prenom} !</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                    Le match commence ! Nous avons bien reçu votre commande. Nos équipes préparent vos articles pour une expédition rapide.
                </p>

                <div style="background-color: #f9f9f9; border-radius: 15px; padding: 20px; margin-top: 30px; border: 1px solid #eeeeee;">
                    <h3 style="color: #552583; margin-top: 0; font-size: 18px; text-transform: uppercase;">Récapitulatif</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="color: #444; font-size: 15px;">
                        ${orderDetails}
                    </table>
                    
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                    
                    <table width="100%">
                        <tr>
                            <td style="font-size: 18px; font-weight: bold; color: #333;">Total payé</td>
                            <td align="right" style="font-size: 22px; font-weight: 900; color: #552583;">
                                ${commande.totalPrice} €
                            </td>
                        </tr>
                    </table>
                </div>

                <table width="100%" style="margin-top: 30px;">
                    <tr>
                        <td align="center">
                            <a href="http://ton-site.com/account/orders" 
                               style="background-color: #552583; color: #FDB927; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                               Suivre ma commande
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding: 30px; background-color: #f8f8f8; text-align: center; color: #999; font-size: 12px;">
                <p style="margin: 0;">Vous recevrez un email dès que votre colis sera expédié.</p>
                <p style="margin: 10px 0 0;">© 2026 Ball Don't Lie - Le terrain vous appartient.</p>
                <div style="margin-top: 15px;">
                    <a href="#" style="color: #552583; text-decoration: none; font-weight: bold;">Support</a> | 
                    <a href="#" style="color: #552583; text-decoration: none; font-weight: bold;">Conditions de vente</a>
                </div>
            </td>
        </tr>
    </table>
</div>
    `,
    });
}

module.exports = { sendEmail, sendOrderConfirmationEmail };