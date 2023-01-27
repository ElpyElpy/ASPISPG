

const check = (req, login) => {

    if (req.body.password.length < 8) {
        return false;
    } else if (!String(req.body.email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return false;
    } else if (login === false) {
        if (req.body.username.length < 1 || req.body.username.length > 16) {
            return false;
        }
    }
    return true;
}

module.exports = { check };