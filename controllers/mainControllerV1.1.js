const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://myanimelist.net/anime/21/One_Piece/characters';
const characterUrl = 'https://en.wikipedia.org/wiki/';

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
               const exName = name.split(',').join('');

               thumbnails.push({
                  name: name.split(',').join(''),
                  image,
                  type,
                  favorites,
                  link:
                     'http://localhost:3000/api/v1/' +
                     exName.replace(/\s/g, '_'),
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
         if (req.params.name) {
            axios(characterUrl + req.params.name).then(response => {
               const html = response.data;
               const $ = cheerio.load(html);

               $('.infobox', html).each(function () {
                  // get name
                  name = $(this).find('.infobox-above').text();

                  // get image
                  image = $(this)
                     .find('td.infobox-image > a > img')
                     .attr('src');
                  // console.log(image)
                  //https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Roronoa_Zoro.jpg/220px-Roronoa_Zoro.jpg

                  // get title
                  $(this)
                     .find('.infobox-label')
                     .each(function () {
                        if (
                           $(this).text() === 'First appearance' ||
                           $(this).text() === 'Created by' ||
                           $(this).text() === 'Portrayed by' ||
                           $(this).text() === 'Voiced by'
                        ) {
                           return;
                        }
                        titles.push($(this).text());
                     });

                  // get detail
                  $(this)
                     .find('.infobox-data')
                     .each(function () {
                        details.push($(this).text());
                     });
               });

               for (let i = 0; i < titles.length; i++) {
                  characterObj[titles[i]] = details[i + 4];
               }
               character.push({
                  name,
                  image: 'https:' + image,
                  ...characterObj,
               });
               // console.log(characterObj);
               res.status(200).json(character);
            });
         } else {
            res.status(404).json({ msg: 'Not found from web!!!' });
         }
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
}

module.exports = new MainController();
