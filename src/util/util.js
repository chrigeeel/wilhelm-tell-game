export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getRandomInt = (max) => Math.floor(Math.random() * max);
