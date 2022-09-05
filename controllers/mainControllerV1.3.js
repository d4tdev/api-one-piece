const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters';
const characterUrl = 'https://onepiece.fandom.com/wiki/';

class MainController {
   // GET ALL CHARACTERS
   getAllCharacters = async (req, res) => {
      const thumbnails = [];

      try {
         axios(url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('.wikitable', html).each(function () {
               $(this)
                  .find('tr')
                  .not(':first-child')
                  .each(function () {
                     const name = $(this).find('td:nth-child(2)').text().trim();
                     const chapter = $(this)
                        .find('td:nth-child(3)')
                        .text()
                        .trim();
                     const episode = $(this)
                        .find('td:nth-child(4)')
                        .text()
                        .trim();
                     const year = $(this).find('td:nth-child(5)').text().trim();
                     const note = $(this).find('td:nth-child(6)').text().trim();

                     thumbnails.push({
                        name,
                        chapter,
                        episode,
                        year,
                        note,
                        link:
                           'https://api-one-piece.onrender.com/api/v1/' +
                           name.split(' ').join('_'),
                     });
                  });
            });

            res.status(200).json({ count: thumbnails.length, thumbnails });
         });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };

   // GET ONE CHARACTER
   getOneCharacter = async (req, res) => {
      let name = null,
         images = [
            'NOTE: Please reload image by press ENTER this link in SEARCH BAR again to watch image',
         ];
      let gallery = null;
      const titles = [],
         details = [];
      const titlesDevilFruit = [],
         detailsDevilFruit = [];
      const characterObj = {},
         devilFruitObj = {};
      const characters = [];

      try {
         axios(characterUrl + req.params.name).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            name = $('aside', html).find('h2').first().text();

            const image = $('aside', html)
               .find('div:nth-child(2) > figure > a')
               .attr('href');
            images.push(image);

            // get details and titles character
            $('section', html)
               .first()
               .each(function () {
                  $(this)
                     .find('section > div > h3')
                     .each(function () {
                        if (
                           $(this).text().split(':')[0] === 'Romanized Name' ||
                           $(this).text().split(':')[0] === 'Birthday' ||
                           $(this).text().split(':')[0] ===
                              '4Kids English VA' ||
                           $(this).text().split(':')[0] ===
                              'Official English Name' ||
                           $(this).text().split(':')[0] === 'Debut' ||
                           $(this).text().split(':')[0] === 'Age' ||
                           $(this).text().split(':')[0] === 'Height' ||
                           $(this).text().split(':')[0] === 'Blood Type' ||
                           $(this).text().split(':')[0] === 'Japanese VA' ||
                           $(this).text().split(':')[0] === 'Odex English VA' ||
                           $(this).text().split(':')[0] === 'Funi English VA' ||
                           $(this).text().split(':')[0] === 'Live-Action Actor'
                        ) {
                           return;
                        }
                        titles.push($(this).text().split(':')[0]);
                     });

                  $(this)
                     .find('section > div')
                     .each(function () {
                        if (
                           $(this).find('h3').text().split(':')[0] ===
                              'Romanized Name' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Birthday' ||
                           $(this).find('h3').text().split(':')[0] ===
                              '4Kids English VA' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Official English Name' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Debut' ||
                           $(this).find('h3').text().split(':')[0] === 'Age' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Height' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Blood Type' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Japanese VA' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Odex English VA' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Funi English VA' ||
                           $(this).find('h3').text().split(':')[0] ===
                              'Live-Action Actor'
                        ) {
                           return;
                        } else {
                           details.push($(this).find('div').text());
                        }
                     });
                  for (let i = 0; i < titles.length; i++) {
                     characterObj[titles[i]] = details[i];
                  }
               });

            // get devil fruit
            if (
               $('section:last-child', html).find('h2:first-child').text() ===
               'Devil Fruit'
            ) {
               $('section:last-child', html).each(function () {
                  // get titles devil fruit
                  $(this)
                     .find('section > div > h3')
                     .each(function () {
                        titlesDevilFruit.push($(this).text().split(':')[0]);
                     });

                  // get details devil fruit
                  $(this)
                     .find('section > div > div')
                     .each(function () {
                        detailsDevilFruit.push($(this).text());
                     });

                  for (let i = 0; i < titlesDevilFruit.length; i++) {
                     devilFruitObj[titlesDevilFruit[i]] = detailsDevilFruit[i];
                  }
               });
            } else {
               devilFruitObj['Devil Fruit'] = 'No Devil Fruit';
            }

            // create link gallery
            if ($('aside > nav').find('a').first().text() === 'Gallery') {
               gallery =
                  'https://api-one-piece.onrender.com/api/v1/' +
                  name.split(' ').join('_') +
                  '/Gallery';
            } else {
               gallery = 'No Gallery';
            }

            characters.push({
               character: { name, images, ...characterObj },
               devilFruit: devilFruitObj,
               gallery,
            });

            res.status(200).json(characters);
         });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };

   // GET GALLERY
   getGallery = async (req, res) => {
      const gallaries = [];

      try {
         axios(characterUrl + req.params.name + '/Gallery').then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('#mw-content-text > div', html)
               .find('table')
               .each(function () {
                  $(this)
                     .find('td > a')
                     .each(function () {
                        gallaries.push($(this).attr('href'));
                     });
               });

            res.status(200).json({
               note: 'Please reload image by press ENTER this link in SEARCH BAR again to watch image',
               gallaries,
            });
         });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
}

module.exports = new MainController();
