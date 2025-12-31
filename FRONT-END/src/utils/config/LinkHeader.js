const HEADER_LINK = [
    { label: "Accueil", path: "/" },
    { label: "Dashboard", path: "/dashboard", auth: "admin" },
    { label: "commande", path: "/historique", auth: "user" },
    { label: "Profil", path: "/profil", auth: "user" },
    { label: "contact", path: "/contact" }
]

export default HEADER_LINK;