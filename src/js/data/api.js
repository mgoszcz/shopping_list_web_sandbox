const URL = 'https://mgoszcz.pythonanywhere.com/shopping_list';

export const apiGet = async function () {
  try {
    const resp = await fetch(URL);
    const data = await resp.json();
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
