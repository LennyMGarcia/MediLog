const __isLoggedIn = (id) => {
   
    const auth_user = {id:id};
    if (auth_user.id != 1) {
        return "200"
    }

    return "307";
}

module.exports = __isLoggedIn;