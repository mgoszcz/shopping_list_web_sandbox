const URL = 'https://mgoszcz.pythonanywhere.com/shopping_list_test';
// const URL = 'http://127.0.0.1:5000/shopping_list';

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

export const apiPost = async function (uploadData) {
  try {
    const fetchPro = fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await fetchPro;
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const apiUpdate = async function (updateData) {
  try {
    const fetchPro = fetch(`${URL}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const res = await fetchPro;
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return { status: res.status, data: data };
  } catch (err) {
    throw err;
  }
};
