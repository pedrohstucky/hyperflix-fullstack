package br.com.streaming.hyperflix.dto.tmdb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TmdbResultDTO {
    private Long id;

    private String title;
    private String name;

    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("vote_average")
    private Double voteAverage;
    @JsonProperty("release_date")
    private String releaseDate;
    @JsonProperty("first_air_date")
    private String firstAirDate;
    @JsonProperty("media_type")
    private String mediaType;
}
