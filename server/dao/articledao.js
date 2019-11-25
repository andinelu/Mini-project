const Dao = require("./dao.js");

module.exports = class PersonDao extends Dao {
    getAll(callback){
        super.query("select id, overskrift, date_format(registrert_tidspunkt, '%Y-%m-%d %k:%i')registrert_tidspunkt from nyhetssaker order by registrert_tidspunkt desc",
            [], callback);
    }

    getImportant(page, callback) {
        var val = [page, 20*(page -1)];
        super.query("select id, overskrift, bilde from nyhetssaker where viktighet=true order by registrert_tidspunkt desc limit ?, 10 ",
            val, callback);
    }

    getNewsFeed(callback) {
        super.query("select id, overskrift, date_format(registrert_tidspunkt, '%Y-%m-%d %k:%i')registrert_tidspunkt from nyhetssaker order by registrert_tidspunkt desc limit 6",
            [], callback);
    }

    getCategory(category, page, callback){
        super.query("select id, overskrift, bilde from nyhetssaker where kategori=? order by registrert_tidspunkt desc limit ?, 10",
            [category, page], callback);
    }

    createOne(json, callback) {
        var val = [json.overskrift, json.innhold, json.bilde, json.kategori, json.viktighet];
        super.query(
            "insert into nyhetssaker (overskrift, innhold, bilde, kategori, viktighet) values(?,?,?,?,?)",
            val,
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "delete from nyhetssaker where id=?",
            [id],
            callback
        );
    }

    getOne(id, callback) {
        super.query(
            "select *, date_format(registrert_tidspunkt, '%Y-%m-%d %k:%i')registrert_tidspunkt from nyhetssaker where id=?",
            [id],
            callback);
    }

    updateOne(json, callback) {
        var val = [json.id, json.overskrift, json.innhold, json.bilde, json.kategori, json.viktighet];
        super.query(
            "update nyhetssaker set overskrift=?, innhold=?, bilde=?, kategori=?, viktighet=? where id=?",
            val,
            callback
        );
    }

};
