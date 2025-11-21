import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    console.log("Запит до API з параметром:", query);

    const response = await axios.get<TMDBResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
        params: {
          query,
          include_adult: false,
        },
      }
    );

    console.log("Відповідь від API:", response.data);

    if (!response.data.results.length) {
      throw new Error("No movies found for your request.");
    }

    return response.data.results;
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error);
    throw error;
  }
}



