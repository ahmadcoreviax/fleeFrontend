export default async function postReq(endpoint, data) {
  let request = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${endpoint}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  let statusCode = request.status;
  let response = await request.json();
  return { response, statusCode };
}
