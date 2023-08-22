# Mercado Libre Clone

This project was created as part of a technical take home interview.

The requirements were as follows:

- As an user looking to buy:
  -Be able to access a list of products. Said list should allow filtering and sorting.
  -Be able to access details of a product and see relevant information such as pictures, questions, etc.

- As an user looking to sell:
  -Be able to access a dashboard with a history of sales and other relevant information, a friendly presentation is valued along with the ability to filter sales by dates.

The data was to be fetched from Mercado Libre's API or mocked locally.

The deadline for the project was 7 days.

## Stack used

I decided to run this React project on **Vite** using **Typescript** , for ease of use and time savings I used **Chakra-UI** for the user interfaces.

Along with that several utility libraries were used, such as **Vitest** and **React Testing Library** for testing purposes.

Even though routing was not a requirement I opted on using **React Router** for a beter user experience and ease of access to data that would otherwise imply prop drilling or global state.

## Other tools

During development I used a **Figma** draft to help break up the UI and the data it would need, said draft can be found here: **https://www.figma.com/file/sD8hJWysjrbUrkYBeT9ZeO/ML-Clone?type=design&node-id=0%3A1&mode=design&t=sWz2tGQPnkgUxflK-1**

Additionally, I deployed the site on **Vercel** so it would be easier to access and navigate through it: **https://ml-clone-eight.vercel.app/**

## Installation

The website can be ran locally by cloning the repository:

```
git clone https://github.com/ignacio-pino/ml-clone.git
```

After cloning the repo:

```
npm install
```

And finally:

```
npm run dev
```
