const HOST = "https://price-alarm.engingokmen.com";

const getAlarms = async (pushToken: string = "") => {
  const response = await fetch(
    `${HOST}/alarm?${new URLSearchParams({
      pushToken,
    }).toString()}`
  );
  const json = await response.json();
  return json;
};

const saveAlarm = async (pushToken: string = "", alarm: any) => {
  const response = await fetch(`${HOST}/alarm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pushToken, alarm }),
  });
  const json = await response.json();
  return json;
};

const updateAlarm = async (pushToken: string = "", alarm: any) => {
  try {
    const response = await fetch(`${HOST}/alarm`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pushToken, alarm }),
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const removeAlarm = async (pushToken: string = "", id: string) => {
  const response = await fetch(`${HOST}/alarm`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pushToken, id }),
  });
  const json = await response.json();
  return json;
};

export const api = { getAlarms, saveAlarm, updateAlarm, removeAlarm };
