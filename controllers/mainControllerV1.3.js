const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const url = process.env.URL;
const characterUrl = process.env.CHARACTER_URL;

class MainController {
   // GET HOME PAGE
   getHomePage = (req, res) => {
      return res.sendFile(path.join(__dirname, '../home.html'));
   };

   // GET ALL CHARACTERS
   getAllCharacters = async (req, res) => {
      let thumbnails = [];

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

            // // limit
            // if (req.query.limit) {
            //    const limit = parseInt(req.query.limit);
            //    if (limit > 0) {
            //       return res.status(200).json(thumbnails.slice(0, limit));
            //    } else {
            //       return res.status(200).json(thumbnails);
            //    }
            // }

            // // pagination
            // if (req.query.page) {
            //    const PAGE_SIZE = 20;
            //    let page = parseInt(req.query.page);
            //    if (page < 1) {
            //       page = 1;
            //       return res.status(200).json(thumbnails.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
            //    } else {
            //       return res.status(200).json(thumbnails.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
            //    }
            // }

            // // api for search by name
            // if (req.query.name) {
            //    let thumbnailsFilter = thumbnails.filter(obj => {
            //       return (
            //          obj.name
            //             .toLowerCase()
            //             .indexOf(req.query.name.toLowerCase()) !== -1
            //       );
            //    });
            //    return res.status(200).json(thumbnailsFilter);
            // } else {
            //    return res
            //       .status(200)
            //       .json({ count: thumbnails.length, thumbnails });
            // }

            let {page, limit, name} = req.query;
            // pagination
            if (page) {
               page = parseInt(page);
               const PAGE_SIZE = 20;
               thumbnails = thumbnails.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
            }
            // search query
            if (name) {
               thumbnails = thumbnails.filter(obj => {
                  return (
                     obj.name
                        .toLowerCase()
                        .indexOf(name.toLowerCase()) !== -1
                  );
               });
            }
            // limit query
            if (limit) {
               limit = parseInt(limit);
               thumbnails = thumbnails.slice(0, limit);
            }

            return res.status(200).json(thumbnails);
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

                  // get details character
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
                     characterObj[titles[i].toLowerCase()] = details[i];
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
                     devilFruitObj[titlesDevilFruit[i].toLowerCase()] =
                        detailsDevilFruit[i];
                  }
               });
            } else {
               devilFruitObj['devil fruit'] = 'No Devil Fruit';
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
