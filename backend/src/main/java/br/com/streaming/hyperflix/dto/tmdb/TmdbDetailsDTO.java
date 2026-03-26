package br.com.streaming.hyperflix.dto.tmdb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class TmdbDetailsDTO {
    private Long id;
    private String title;
    private String name;
    private String overview;

    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("backdrop_path")
    private String backdropPath;
    @JsonProperty("vote_average")
    private Double voteAverage;
    @JsonProperty("release_date")
    private String releaseDate;
    @JsonProperty("first_air_date")
    private String firstAirDate;

    private Integer runtime;

    @JsonProperty("episode_run_time")
    private List<Integer> episodeRunTime;
    @JsonProperty("number_of_seasons")
    private Integer numberOfSeasons;

    private List<GenreDTO> genres;

    @Data
    public static class GenreDTO {
        private Integer id;
        private String name;
    }
}
