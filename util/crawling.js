const client = require('cheerio-httpcli');
const {eucKrEncoding} = require('./encoding');
const {get, map, go, rest, rest2} = require('../js/fp');


const elevenCrawling = (searchTerm) => {
    return new Promise((resolve, reject) => {    // url 인코딩 두번
        client.fetch('http://search.11st.co.kr/Search.tmall?kwd=' + encodeURIComponent(encodeURIComponent(searchTerm)), function (err, $, response, body) {
            const result = [];
            $('div[class=total_listitem]').each(function (idex) {
                const data = {};
                let url = $(this)
                    .children('div[class=photo_wrap]')
                    .children('a')
                    .attr('href');

                let img = $(this)
                    .children('div[class=photo_wrap]')
                    .children('a')
                    .children('img')
                    .attr('data-original');

                let name = $(this)
                    .children('div[class=list_info]')
                    .children('p[class=info_tit]')
                    .children('a')
                    .text().trim();

                let price = $(this)
                    .children('div[class=list_price]')
                    .children('div[class=price_box]')
                    .children('span[class=price_detail]')
                    .children('strong')
                    .text();


                data.product_url = url;
                data.product_name = name;
                data.product_price = price;
                data.product_image = img;
                data.product_commerce = "eleven";
                data.product_search = searchTerm;

                result.push(data);

            });
            if (err) reject(err);
            resolve(result);
        });
    });
}

const gmarketCrawling = (searchTerm) => {
    return new Promise((resolve, reject) => {
        const encodingTerm = eucKrEncoding(searchTerm);
        client.fetch('http://search.gmarket.co.kr/search.aspx?keyword=' + encodingTerm, function (err, $, response, body) {
            let result = [];
            $('li[class=focusitem]').each(function (idex) {
                let data = {};
                let url = $(this)
                    .children('div[class=item_info]')
                    .children('a[target=_blank]')
                    .attr('href');

                let img = $(this)
                    .children('div[class=item_info]')
                    .children('a[target=_blank]')
                    .children('span[class=thumb]').children('img').attr('src');

                let name = $(this)
                    .children('div[class=item_info]')
                    .children('a[target=_blank]')
                    .children('span[class=title]')
                    .text().trim();

                let price = $(this)
                    .children('div .price_info') // div class="price_info price_rentalinfo"
                    .children('span[class=price]')
                    .children('a')
                    .children('strong')
                    .text();

                data.product_url = url;
                data.product_name = name;
                data.product_price = price;
                data.product_image = img;
                data.product_commerce = "gmarket";
                data.product_search = searchTerm;

                result.push(data);
            });
            if (err) reject(err);
            resolve(result);

        });
    });
}

const auctionCrawling = (searchTerm) => {
    return new Promise((resolve, reject) => {
        client.fetch('http://browse.auction.co.kr/search?keyword=' + encodeURIComponent(searchTerm), function (err, $, response, body) {
            const result = [];

            $('div[class=section--itemcard_info]').each(function (idex) {
                const data = {};

                let url = $(this)
                    .children('div[class=section--itemcard_info_major]')
                    .children('div[class=area--itemcard_title]')
                    .children()
                    .children('a')
                    .attr('href');

                let name = $(this)
                    .children('div[class=section--itemcard_info_major]')
                    .children('div[class=area--itemcard_title]')
                    .children()
                    .children('a')
                    .children('span[class=text--title]')
                    .text().trim();

                let price = $(this)
                    .children('div[class=section--itemcard_info_major]')
                    .children('div[class=area--itemcard_price]')
                    .children()
                    .children('strong[class=text--price_seller]')
                    .text();

                data.product_url = url;
                data.product_name = name;
                data.product_price = price;
                data.product_commerce = "auction";
                data.product_search = searchTerm;
                result.push(data);
            });
            // 파워 광고 상품 제거
            result.splice(0, 8);


            const script = $('script[id=initial-state]').text();
            const originalData = script.substr(29, script.length);
            const jsonData = JSON.parse(originalData);
            const regions = rest(jsonData.regions[3].modules);
            const modules = rest2(regions);
            const rows = go(modules,
                map(get('rows')));

            const image = new Array();

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < rows[i].length; j++) {
                    image.push(rows[i][j].viewModel.item.imageUrl);
                }
            }

            for (let i = 0; i < result.length; i++) {
                result[i].product_image = image[i];
            }
            if (err) reject(err);
            resolve(result);
        });
    });
}


const wemakerCrawling = (searchTerm) => {
    return new Promise((resolve, reject) => {
        client.fetch('http://search.wemakeprice.com/search?search_cate=top&search_keyword=' + encodeURIComponent(searchTerm), function (err, $, response, body) {
            const result = [];

            $('li[parent_id=0]').each(function (idex) {
                const data = {};
                let url = $(this)
                    .children('span')
                    .children('a')
                    .attr('href');

                let img = $(this)
                    .children('span')
                    .children('a')
                    .children('span[class=box_thumb]')
                    .children('img')
                    .attr('data-original')

                let name = $(this)
                    .children('span')
                    .children('a')
                    .children('span[class=box_desc]')
                    .children('strong')
                    .text().trim();

                let price = $('span[class=won]').remove();

                price = $(this)
                    .children('span')
                    .children('a')
                    .children('span[class=box_desc]')
                    .children('span[class=txt_info]')
                    .children('span[class=price]')
                    .children('span[class=sale]')
                    .text();

                data.product_url = url;
                data.product_name = name;
                data.product_price = price;
                data.product_image = img;
                data.product_commerce = "wemaker";
                data.product_search = searchTerm;

                result.push(data);
            });
            // 광고 상품 제거
            result.splice(0, 10);
            if (err) reject(err);
            resolve(result);
        });

    });
}

const ssgCrawling = (searchTerm) => {
    return new Promise((resolve, reject) => {
        client.fetch('http://www.ssg.com/search.ssg?query=' + encodeURIComponent(searchTerm), function (err, $, response, body) {

            const result = [];
            $('li[data-unittype=item]').each(function (idex) {
                const data = {};
                let url = $(this)
                    .children('div .cunit_prod')
                    .children('div[class=thmb]')
                    .children('a')
                    .attr('href');

                let img = $(this)
                    .children('div .cunit_prod')
                    .children('div[class=thmb]')
                    .children('a')
                    .children('img')
                    .attr('src');

                let name = $(this)
                    .children('div .cunit_info')
                    .children('div[class=cunit_md]')
                    .children('div')
                    .children('a')
                    .text().trim();

                let price = $(this)
                    .children('div .cunit_info')
                    .children('div[class=cunit_price]')
                    .children('div[class=opt_price]')
                    .children('em').text();

                data.product_url = `http://www.ssg.com${url}`;
                data.product_name = name;
                data.product_price = price;
                data.product_image = `http:${img}`;
                data.product_commerce = "ssg";
                data.product_search = searchTerm;


                result.push(data);
            });
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {elevenCrawling, gmarketCrawling, auctionCrawling, wemakerCrawling, ssgCrawling};