const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {
    getAll(id, callback) {
        super.query("select brukernavn, innhold,  date_format(registrert, '%Y-%m-%d %k:%i') registrert from kommentar where nyhetssak_id=? order by registrert desc",
            [id], callback);
    }

    createOne(json, callback) {
        var val = [json.nyhetssak_id, json.brukernavn, json.innhold];
        super.query(
            "insert into kommentar (nyhetssak_id, brukernavn, innhold) values(?,?,?)",
            val,
            callback
        );
    }
};
