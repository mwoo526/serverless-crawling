const { createMarket } = require('./model/createMarket');
const { elevenCrawling, gmarketCrawling, auctionCrawling, wemakerCrawling, ssgCrawling } = require('../util/crawling');

app.post('/create', async (req, res)=> {

    let searchTerm = req.body.productName;
    try{

        await createMarket(searchTerm,"eleven",elevenCrawling);
        await createMarket(searchTerm,"gmarket",gmarketCrawling);
        await createMarket(searchTerm,"auction",auctionCrawling);
        await createMarket(searchTerm,"wemaker",wemakerCrawling);
        await createMarket(searchTerm,"SSG",ssgCrawling);

        res.render('result', {
            searchTerm: searchTerm
        })
        ;

    } catch (err) {
        switch (err) {
            case 'eleven':
                res.render('err', {
                    searchTerm: '11번가에 이미 존재하는 상품입니다.'
            });
                break;
            case 'gmarket':
                res.render('err', {
                    searchTerm: 'g마켓에 이미 존재하는 상품입니다.'
                });
                break;
            case 'auction':
                res.render('err', {
                    searchTerm: '옥션에 이미 존재하는 상품입니다.'
                });
                break;
            case 'wemaker':
                res.render('err', {
                    searchTerm: '위메프에 이미 존재하는 상품입니다.'
                });
                break;
            case 'SSG':
                res.render('err', {
                    searchTerm: 'ssg에 이미 존재하는 상품입니다.'
                });
                break;
            default:
                res.render('err',{
                    searchTerm: err.message
                });
        }
    }


});

