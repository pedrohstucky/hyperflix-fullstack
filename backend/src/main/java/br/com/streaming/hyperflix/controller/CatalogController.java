package br.com.streaming.hyperflix.controller;

import br.com.streaming.hyperflix.dto.MoviePageResponseDTO;
import br.com.streaming.hyperflix.dto.MovieResponseDTO;
import br.com.streaming.hyperflix.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog")
@RequiredArgsConstructor
public class CatalogController {
    private final TmdbService tmdbService;

    @GetMapping("/trending")
    public ResponseEntity<List<MovieResponseDTO>> getTrending() {
        List<MovieResponseDTO> trendingMovies = tmdbService.getTrending();
        return ResponseEntity.ok(trendingMovies);
    }

    @GetMapping("/discover")
    public ResponseEntity<MoviePageResponseDTO> discoverMovies(
            @RequestParam Integer genreId,
            @RequestParam(defaultValue = "1") Integer page
    ) {
        return ResponseEntity.ok(tmdbService.discoverMoviesByGenre(genreId, page));
    }

    @GetMapping("/search")
    public ResponseEntity<MoviePageResponseDTO> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") Integer page
    ) {
        return ResponseEntity.ok(tmdbService.searchMovies(query, page));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
