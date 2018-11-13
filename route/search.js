const { listSearchTest } = require('../database/select');
const { get, map, go } = require('../js/fp');

app.get('/search', async (req,res) => {

    const data = go(
        await listSearchTest(),
        map(get('product_search')));

    res.render('search',{
        data: data
    });
})