const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://myanimelist.net/anime/21/One_Piece/characters';
const characterUrl = 'https://myanimelist.net/character/';

class MainController {
   // GET ALL CHARACTERS
   getAllCharacters = (req, res) => {
      const thumbnails = [];

      try {
         axios(url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('.js-anime-character-table', html).each(function () {
               const name = $(this).find('h3').text();
               const image = $(this).find('a > img').attr('data-src');
               const type = $(this)
                  .find('td:nth-child(2) > div:nth-child(4)')
                  .prop('innerText')
                  .trim();
               const favorites = $(this)
                  .find('td:nth-child(2) > div:nth-child(2)')
                  .prop('innerText')
                  .trim();
               const link = $(this)
                  .find('td:nth-child(2) > div:nth-child(3) > a')
                  .attr('href');
               // console.log( link);

               thumbnails.push({
                  name: name.split(',').join(''),
                  image,
                  type,
                  favorites,
                  link:
                     'http://localhost:3000/api/v1/' +
                     link.split('/')[4] +
                     '/' +
                     link.split('/')[5],
               });
            });
            res.status(200).json(thumbnails);
         });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
   getOneCharacter = (req, res) => {
      let name = null,
         image = null;
      const titles = [],
         details = [];
      const characterObj = {};
      const character = [];

      try {
         if (req.params.name && req.params.id) {
            axios(characterUrl + req.params.id + '/' + req.params.name).then(
               response => {
                  const html = response.data;
                  const $ = cheerio.load(html);

                  $('td', html)
                     .last()
                     .each(function () {
                        // $(this).find('td:nth-child(2)').each(function(){
                        titles.push($(this).prop('innerText'));
                        // })
                     });
                  console.log(titles);
                  res.status(200).json(titles);
               }
            );
         } else {
            res.status(404).json({ msg: 'Not found from web!!!' });
         }
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
}

module.exports = new MainController();
