package br.com.streaming.hyperflix.controller;

import br.com.streaming.hyperflix.dto.MovieResponseDTO;
import br.com.streaming.hyperflix.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:5173")
public class CatalogController {
    private final TmdbService tmdbService;

    @GetMapping("/trending")
    public ResponseEntity<List<MovieResponseDTO>> getTrending() {
        List<MovieResponseDTO> trendingMovies = tmdbService.getTrending();
        return ResponseEntity.ok(trendingMovies);
    }
}
