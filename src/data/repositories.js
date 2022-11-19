export const fetchStarredRepositories = async (date, page) => {
  const data = await fetch(
    `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`
  ); //Method to call API and it will  send request to gicven url and wait for response
  const parseData = await data.json(); // convert string to json object
  return parseData;
};
