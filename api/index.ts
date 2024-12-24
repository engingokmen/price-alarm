const getAlarms = async (pushToken: string = "") => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/alarm`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pushToken,
    }),
  });
  const json = await response.body;
  return json;
};

export const api = { getAlarms };
