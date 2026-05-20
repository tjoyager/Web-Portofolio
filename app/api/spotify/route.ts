import { NextResponse } from "next/server";

// Spotify API integration
// To set up:
// 1. Create app at https://developer.spotify.com/dashboard
// 2. Add these to .env.local:
//    SPOTIFY_CLIENT_ID=your_client_id
//    SPOTIFY_CLIENT_SECRET=your_client_secret
//    SPOTIFY_REFRESH_TOKEN=your_refresh_token
// 3. To get refresh token, follow: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  return data.access_token || null;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 30 },
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data.is_playing || !data.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      name: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(", "),
      albumArt: data.item.album.images?.[0]?.url || "",
      url: data.item.external_urls?.spotify || "#",
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
