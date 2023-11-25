const api = async (url, method, body) => {
  const result = await fetch("https://sports-case.scholten.dev/nils/" + url, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!result.ok) {
    console.error(`Something went wrong while trying to recieve the ${url} !`);
    throw new Error();
  }

  return await result.json();
};

export default api;
