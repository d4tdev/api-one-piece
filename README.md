# api-one-piece

> take infor from api  
> web-scraped from https://onepiece.fandom.com/wiki/List_of_Canon_Characters

## Get All Characters
> https://api-one-piece.onrender.com/api/v1

| Key | Type |
| --- | --- |
| name | String |
| chapter | String |
| episode | String |
| year | String |
| link | String (get one character) |

## can use search by name
> ex: https://api-one-piece.onrender.com/api/v1?name=Sanj

## Get One Character
> https://api-one-piece.onrender.com/api/v1/{name}  
> ex: https://api-one-piece.onrender.com/api/v1/Sanji

| Key | Type |
| --- | --- |
| name | String |
| images | String |
| japanese name | String |
| affiliations | String |
| occupations | String |
| origin | String |
| residence | String |
| alias | String |
| epithet | String |
| birth name | String |
| status | String |
| bounty | String |
| --- | --- |
| devil fruit | String |
| --- | --- |
| gallery | String |

## Get Gallery From Character (if have)
> https://api-one-piece.onrender.com/api/v1/{name}/Gallery  
> ex: https://api-one-piece.onrender.com/api/v1/Sanji/Gallery

