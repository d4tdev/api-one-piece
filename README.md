![GIF-LUFFY](https://i.pinimg.com/originals/50/c5/f1/50c5f1847013012ee0f25f67fdddb8d9.gif)  <br>

# API One Piece

> take infor from api  <br>
> web-scraped from https://onepiece.fandom.com/wiki/List_of_Canon_Characters

## Get All Characters

```GET: https://api-0ne-piece.herokuapp.com/api/v1```

| Key     | Type                       |
| ------- | -------------------------- |
| name    | String                     |
| chapter | String                     |
| episode | String                     |
| year    | String                     |
| link    | String (get one character) |

### Query Search

> ex: https://api-0ne-piece.herokuapp.com/api/v1?name=Sanj

### Query Limit

> ex: hhttps://api-0ne-piece.herokuapp.com/api/v1?limit=10

### Query Page - Pagination

> ex: hhttps://api-0ne-piece.herokuapp.com/api/v1?page=1

## Get One Character

```GET: https://api-0ne-piece.herokuapp.com/api/v1/{name}  ```<br>

> ex: https://api-0ne-piece.herokuapp.com/api/v1/Sanji

| Key           | Type                 |
| ------------- | -------------------- |
| name          | String               |
| images        | String               |
| japanese name | String               |
| affiliations  | String               |
| occupations   | String               |
| origin        | String               |
| residence     | String               |
| alias         | String               |
| epithet       | String               |
| birth name    | String               |
| status        | String               |
| bounty        | String               |
| devil fruit   | String               |
| gallery       | String (get gallery) |

## Get Gallery From Character (if have)

```GET: https://api-0ne-piece.herokuapp.com/api/v1/{name}/Gallery  ```<br>

> ex: https://api-0ne-piece.herokuapp.com/api/v1/Sanji/Gallery
