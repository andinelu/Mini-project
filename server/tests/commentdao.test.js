var mysql = require("mysql");

const commentDao = require("miniprosjekt/server/dao/commentdao.js");

// GitLab CI Pool
var pool = mysql.createPool({
    connectionLimit: 3,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "andinel",
    password: "4BA61FfC",
    database: "andinel",
    debug: false,
    multipleStatements: true
});



let commentDao = new CommentDao(pool);


afterAll(() => {
    pool.end();
});


test("add comment to db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    personDao.createOne(
        { nyhetssak_id: 32, brukernavn: "rudolf", innhold: "Kommentar" },
        callback
    );
});

test("get all comments from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    personDao.getAll(callback);
});
