package br.com.streaming.hyperflix.service;

import br.com.streaming.hyperflix.dto.MovieResponseDTO;
import br.com.streaming.hyperflix.dto.tmdb.TmdbPageResponseDTO;
import br.com.streaming.hyperflix.dto.tmdb.TmdbResultDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TmdbService {
    private final RestClient restClient;
    private final String IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    public TmdbService(@Value("${tmdb.api.base-url}") String baseUrl,
                       @Value("${tmdb.api.token}") String token) {
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + token)
                .build();
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
