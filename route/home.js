const {checkUser} = require('../database/select');
const {listSearchTest} = require('../database/select');
const {get, map, go} = require('../js/fp');


app.get('/', (req, res) => {
    res.render('home',{
        data:''
    });
});

app.post('/user', async (req, res) => {
    let user = req.body;
    try {
        const result = await checkUser(user);

        if (result[0] == null) {
            res.render('home', {
            data: '잘못된 계정형식입니다.'
            });
        }

        else {
            const data = go(
                await listSearchTest(),
                map(get('product_search')));
            res.render('search', {
                data: data
            });
        }
    } catch (e) {

    }
})