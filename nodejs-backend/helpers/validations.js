class Validations {
    static username(username) {
        if (typeof username !== 'string') throw new Error('Username must be a string');
        if (username.length < 5) throw new Error('Username must be at least 5 characters');
    }

    static password(password) {
        if (typeof password !== 'string') throw new Error('Password must be a string');
        if (password.length < 8) throw new Error('Password must be at least 8 characters');
    }
}

module.exports = { Validations }  