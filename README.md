# api-one-piece

> take infor from api  <br>
> web-scraped from https://onepiece.fandom.com/wiki/List_of_Canon_Characters

## Get All Characters

``` GET: https://api-one-piece.onrender.com/api/v1 ```

| Key     | Type                       |
| ------- | -------------------------- |
| name    | String                     |
| chapter | String                     |
| episode | String                     |
| year    | String                     |
| link    | String (get one character) |

## Query Search

> ex: https://api-one-piece.onrender.com/api/v1?name=Sanj

## Get One Character

```GET: https://api-one-piece.onrender.com/api/v1/{name}  ```<br>
> ex: https://api-one-piece.onrender.com/api/v1/Sanji

| Key           | Type   |
| ------------- | ------ |
| name          | String |
| images        | String |
| japanese name | String |
| affiliations  | String |
| occupations   | String |
| origin        | String |
| residence     | String |
| alias         | String |
| epithet       | String |
| birth name    | String |
| status        | String |
| bounty        | String |
| devil fruit   | String |
| gallery       | String |

## Get Gallery From Character (if have)

```GET: https://api-one-piece.onrender.com/api/v1/{name}/Gallery  ```<br>
> ex: https://api-one-piece.onrender.com/api/v1/Sanji/Gallery
