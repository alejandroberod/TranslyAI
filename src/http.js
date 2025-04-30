export async function translate(text, lang) {
  const response = await fetch("http://localhost:4000/api/translate", {
    method: 'POST',
    body: JSON.stringify({text, lang}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json();

  return resData;
}