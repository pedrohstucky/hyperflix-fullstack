package br.com.streaming.hyperflix.service;

import br.com.streaming.hyperflix.dto.MoviePageResponseDTO;
import br.com.streaming.hyperflix.dto.MovieResponseDTO;
import br.com.streaming.hyperflix.dto.TitleDetailsResponseDTO;
import br.com.streaming.hyperflix.dto.tmdb.TmdbDetailsDTO;
import br.com.streaming.hyperflix.dto.tmdb.TmdbPageResponseDTO;
import br.com.streaming.hyperflix.dto.tmdb.TmdbResultDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TmdbService {
    private final RestClient restClient;
    private final String IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    public TmdbService(RestClient tmdbRestClient) {
        this.restClient = tmdbRestClient;
    }

    public List<MovieResponseDTO> getTrending() {
        TmdbPageResponseDTO response = restClient.get()
                .uri("/trending/all/week?language=pt-BR")
                .retrieve()
                .body(TmdbPageResponseDTO.class);

        if (response == null || response.getResults() == null) {
            return List.of();
        }

        return response.getResults().stream()
                .map(this::convertToFrontendDTO)
                .collect(Collectors.toList());
    }

    public MoviePageResponseDTO discoverMoviesByGenre(Integer genreId, Integer page) {
        int safePage = (page == null || page < 1) ? 1 : page;
        String endpoint = (genreId == 10759 || genreId == 16) ? "/discover/tv" : "/discover/movie";
        String url = endpoint + "?language=pt-BR&sort_by=popularity.desc&with_genres=" + genreId + "&page=" + safePage;

        TmdbPageResponseDTO response = restClient.get()
                .uri(url)
                .retrieve()
                .body(TmdbPageResponseDTO.class);

        if (response == null || response.getResults() == null) return new MoviePageResponseDTO(1, 1, List.of());

        List<MovieResponseDTO> movies = response.getResults().stream()
                .map(this::convertToFrontendDTO)
                .collect(Collectors.toList());

        return new MoviePageResponseDTO(response.getPage(), response.getTotalPages(), movies);
    }

    public MoviePageResponseDTO searchMovies(String query, Integer page) {
        if (query == null || query.trim().isEmpty()) {
            return new MoviePageResponseDTO(1, 1, List.of());
        }

        int safePage = (page == null || page < 1) ? 1 : page;

        TmdbPageResponseDTO response = restClient.get()
                .uri("/search/multi?language=pt-BR&query={query}&page={page}", query, safePage)
                .retrieve()
                .body(TmdbPageResponseDTO.class);

        if (response == null || response.getResults() == null) return new MoviePageResponseDTO(1, 1, List.of());

        List<MovieResponseDTO> movies = response.getResults().stream()
                .filter(item -> "movie".equals(item.getMediaType()) || "tv".equals(item.getMediaType()))
                .map(this::convertToFrontendDTO)
                .collect(Collectors.toList());

        return new MoviePageResponseDTO(response.getPage(), response.getTotalPages(), movies);
    }

    public TitleDetailsResponseDTO getTitleDetails(String type, Long id) {
        if (!type.equals("movie") && !type.equals("tv")) {
            throw new IllegalArgumentException("Type must be 'movie' or 'tv'");
        }

        try {
            TmdbDetailsDTO response = restClient.get()
                    .uri("/{type}/{id}?language=pt-BR", type, id)
                    .retrieve()
                    .body(TmdbDetailsDTO.class);

            if (response == null) return null;

            return convertDetailsToFrontendDTO(response, type);
        } catch (HttpClientErrorException.NotFound e) {
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar detalhes no TMDB: " + e.getMessage());
        }
    }

    private TitleDetailsResponseDTO convertDetailsToFrontendDTO(TmdbDetailsDTO tmdbDTO, String type) {
        String title = tmdbDTO.getTitle() != null ? tmdbDTO.getTitle() : tmdbDTO.getName();
        String rawDate = tmdbDTO.getReleaseDate() != null ? tmdbDTO.getReleaseDate() : tmdbDTO.getFirstAirDate();
        Integer year = (rawDate != null && rawDate.length() >= 4) ? Integer.parseInt(rawDate.substring(0, 4)) : null;

        String posterUrl = tmdbDTO.getPosterPath() != null ? IMAGE_BASE_URL + tmdbDTO.getPosterPath() : null;
        String backdropUrl = tmdbDTO.getBackdropPath() != null ? "https://image.tmdb.org/t/p/original" + tmdbDTO.getBackdropPath(): null;

        Integer runtime = tmdbDTO.getRuntime();
        if (runtime == null && tmdbDTO.getEpisodeRunTime() != null && !tmdbDTO.getEpisodeRunTime().isEmpty()) {
            runtime = tmdbDTO.getEpisodeRunTime().getFirst();
        }

        List<String> genreNames = tmdbDTO.getGenres() != null
                ? tmdbDTO.getGenres().stream().map(TmdbDetailsDTO.GenreDTO::getName).toList()
                : List.of();

        return TitleDetailsResponseDTO.builder()
                .id(tmdbDTO.getId())
                .title(title)
                .overview(tmdbDTO.getOverview())
                .posterUrl(posterUrl)
                .backdropUrl(backdropUrl)
                .rating(tmdbDTO.getVoteAverage())
                .year(year)
                .type(type)
                .runtime(runtime)
                .seasons(tmdbDTO.getNumberOfSeasons())
                .genres(genreNames)
                .build();
    }

    private MovieResponseDTO convertToFrontendDTO(TmdbResultDTO tmdbDto) {
        String title = tmdbDto.getTitle() != null ? tmdbDto.getTitle() : tmdbDto.getName();

        String rawDate = tmdbDto.getReleaseDate() != null ? tmdbDto.getReleaseDate() : tmdbDto.getFirstAirDate();
        Integer year = (rawDate != null && rawDate.length() >= 4) ? Integer.parseInt(rawDate.substring(0, 4)) : null;

        // constroi a url completa da imagem
        String imageUrl = tmdbDto.getPosterPath() != null ? IMAGE_BASE_URL + tmdbDto.getPosterPath() : null;

        return MovieResponseDTO.builder()
                .id(tmdbDto.getId())
                .title(title)
                .imageUrl(imageUrl)
                .rating(tmdbDto.getVoteAverage())
                .year(year)
                .type(tmdbDto.getMediaType())
                .build();
    }
}
