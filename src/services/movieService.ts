import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    console.log("Запит до API з параметром:", query); // Додаємо лог для перевірки запиту

    const response = await axios.get<TMDBResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query },
        headers: {
  Accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
}


      }
    );

    console.log("Отримана відповідь від API:", response); // Логуємо відповідь

    if (response.data.results.length === 0) {
      throw new Error("No movies found for your request.");
    }

    return response.data.results;
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error);
    throw error; // Повертаємо помилку для подальшої обробки
  }
}

