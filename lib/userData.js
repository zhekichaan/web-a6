import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "JWT " + getToken(),
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "JWT " + getToken(),
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
export async function getFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "JWT " + getToken(),
    },
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: "JWT " + getToken(),
    },
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: "JWT " + getToken(),
    },
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "JWT " + getToken(),
    },
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
