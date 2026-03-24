package br.com.streaming.hyperflix.controller;

import br.com.streaming.hyperflix.dto.MoviePageResponseDTO;
import br.com.streaming.hyperflix.dto.MovieResponseDTO;
import br.com.streaming.hyperflix.service.TmdbService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(CatalogController.class)
class CatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TmdbService tmdbService;

    @Test
    @DisplayName("Deve buscar os filmes em alta e retornar status 200 com a lista formatada")
    void shouldFetchTrendingMoviesSuccessfully() throws Exception {
        var mockMovies = List.of(
                MovieResponseDTO.builder()
                        .id(101L)
                        .title("Duna: Parte 3")
                        .imageUrl("https://image.tmdb.org/t/p/w500/duna3.jpg")
                        .rating(9.0)
                        .year(2026)
                        .type("movie")
                        .build()
        );

        given(tmdbService.getTrending()).willReturn(mockMovies);

        mockMvc.perform(get("/api/v1/catalog/trending")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].title").value("Duna: Parte 3"))
                .andExpect(jsonPath("$[0].year").value(2026))
                .andExpect(jsonPath("$[0].id").value(101L));

        verify(tmdbService).getTrending();
    }

    @Test
    @DisplayName("Deve descobrir filmes por gênero respeitando a paginação")
    void shouldDiscoverMoviesByGenreAndPage() throws Exception {
        var genreId = 878;
        var page = 2;

        var mockPageResponse = MoviePageResponseDTO.builder()
                .page(page)
                .totalPages(10)
                .results(List.of(
                        MovieResponseDTO.builder().title("Interstellar 2").build()
                ))
                .build();

        given(tmdbService.discoverMoviesByGenre(genreId, page)).willReturn(mockPageResponse);

        mockMvc.perform(get("/api/v1/catalog/discover")
                        .param("genreId", String.valueOf(genreId))
                        .param("page", String.valueOf(page))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page").value(2))
                .andExpect(jsonPath("$.totalPages").value(10))
                .andExpect(jsonPath("$.results.size()").value(1))
                .andExpect(jsonPath("$.results[0].title").value("Interstellar 2"));

        verify(tmdbService).discoverMoviesByGenre(genreId, page);
    }

    @Test
    @DisplayName("Deve usar a página 1 como padrão quando o parâmetro não for enviado")
    void shouldDefaultToOneWhenPageParamIsMissing() throws Exception {
        var genreId = 28;
        var defaultPage = 1;

        var mockPageResponse = MoviePageResponseDTO.builder().page(defaultPage).build();
        given(tmdbService.discoverMoviesByGenre(genreId, defaultPage)).willReturn(mockPageResponse);

        mockMvc.perform(get("/api/v1/catalog/discover")
                        .param("genreId", String.valueOf(genreId))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page").value(1));

        verify(tmdbService).discoverMoviesByGenre(genreId, defaultPage);
    }

    @Test
    @DisplayName("Deve buscar título por texto e retornar a lista de resultados paginada")
    void shouldSearchMoviesByTitle() throws Exception {
        var query = "Batman";
        var mockPageResponse = MoviePageResponseDTO.builder()
                .page(1)
                .totalPages(5)
                .results(List.of(
                        MovieResponseDTO.builder().id(1L).title("The Batman").build(),
                        MovieResponseDTO.builder().id(2L).title("Batman Begins").build()
                ))
                .build();

        given(tmdbService.searchMovies(query, 1)).willReturn(mockPageResponse);

        mockMvc.perform(get("/api/v1/catalog/search")
                        .param("query", query)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.results.size()").value(2))
                .andExpect(jsonPath(".results[0].title").value("The Batman"))
                .andExpect(jsonPath("$.results[1].title").value("Batman Begins"));

        verify(tmdbService).searchMovies(query, 1);

    }
}