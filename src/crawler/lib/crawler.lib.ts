import axios from 'axios';
import * as cheerio from 'cheerio';

interface Laptop {
    title: string;
    price: number;
    dolar: string;
    description: string;
    reviews: string;
    link: string;
    evaluation: string;
}
async function getHtmlPage(url : string) {
    const { data } = await axios.get(url);
    return data;
}
async function getTotalPages (url : string) {
    const data = await getHtmlPage(url)
    const $ = cheerio.load(data);
    return parseInt($('li.page-item').eq(-2).text().trim(), 10) || 1;
}
async function getProducts(url: string, filter: string): Promise<Laptop[]> {
    const data = await getHtmlPage(url)
    const $ = cheerio.load(data);
    const baseUrl = 'https://webscraper.io';
    const laptops: Laptop[] = [];

    $('.thumbnail').each((_i, item) => {
        const titleElement = $(item).find('.title');
        const title = $(item).find('.title').text().trim();
        const dolar = $(item).find('.price').text().trim();
        const price = +dolar.replace("$", "");
        const description = $(item).find('.description').text().trim();
        const reviews = $(item).find('.review-count').text().trim();
        const relativeLink = titleElement.attr('href') || '';
        const link = relativeLink ? `${baseUrl}${relativeLink}` : '';
        const evaluationCont = $(item).find('span.ws-icon.ws-icon-star').length;
        const evaluation = evaluationCont === 1 ? evaluationCont.toString() + ' Estrela' : evaluationCont.toString() +' Estrelas';
        if (title.toLowerCase().includes(filter.toLowerCase())) {
            laptops.push({ title, price, dolar, description, reviews, link, evaluation });
        }
    });

    return laptops;
}
export const crawlerProcess = async (url: string, filterNotebook: string) => {
    let products:any = []
    const totalPage = await getTotalPages(url);
    for (let p = 1; p <= totalPage; p++) {
        let urlPage =  url + p.toString();
        await getProducts(urlPage, filterNotebook).then((data) => {
            data.forEach((item) => {
                products.push(item)
            })
        }).catch((err) => console.error('Erro durante a processamento da pagina:', err));
    }

    return products.sort((a : any, b : any) => a.price - b.price);
}