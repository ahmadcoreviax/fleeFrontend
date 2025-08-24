export default async function getReq(endpoint) {
  let request = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${endpoint}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  let statusCode = request.status;
  let response = await request.json();
  return { response, statusCode };
}
