import { isServer } from "solid-js/web";

export function getStrapiURL(path = "") {
	return `${
    import.meta.env.VITE_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

export default async function fetchAPI(args: { path: string, init?: RequestInit }) {
  const requestUrl = getStrapiURL(args.path)
  const headers = isServer ? { "User-Agent": "chrome" } : {};
  if (args.init?.headers) {
    Object.assign(headers, args.init.headers);
  }

  try {
    let response = await(await fetch(requestUrl, args.init))
    return (await response.json());
  } catch (error) {
    return { error };
  }
}
