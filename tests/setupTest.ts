import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// @ts-ignore
global.fetchMock = fetchMock;