package br.com.streaming.hyperflix.dto.tmdb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class TmdbPageResponseDTO {
    private Integer page;
    private List<TmdbResultDTO> results;

    @JsonProperty("total_pages")
    private Integer totalPages;
}
