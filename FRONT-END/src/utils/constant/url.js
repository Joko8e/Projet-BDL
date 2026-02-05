const URL = {
    
    AUTH_SIGN: '/api/auth/login',
    AUTH_REGISTER:'/api/auth/register',

    POST_MARQUE: '/api/marque/post',
    GET_ALL_MARQUE: '/api/marque/get',
    GET_MARQUE_BY_ID: '/api/marque/get',
    UPDATE_MARQUE: '/api/marque/put',
    DELETE_MARQUE: '/api/marque/delete',
    
    POST_PRODUIT: '/api/produit/post',
    GET_ALL_PRODUIT: '/api/produit/get',
    GET_PRODUIT_BY_ID: '/api/produit/get',
    UPDATE_PRODUIT: '/api/produit/put',
    DELETE_PRODUIT: '/api/produit/delete',
    
    POST_COMMANDE: '/api/commande/post',
    GET_ALL_COMMANDE: '/api/commande/get',
    GET_COMMANDE_BY_USER: '/api/commande/get',
    UPDATE_COMMANDE_STATUS: '/api/commande/update',
    DELETE_COMMANDE: '/api/commande/delete',

    POST_USER: '/api/user/register',
    GET_ALL_USERS: '/api/user/get',
    GET_USER_BY_ID:  '/api/user/get',
    UPDATE_USER: '/api/user/put',
    DELETE_USER: '/api/user/delete',
}

export default URL;