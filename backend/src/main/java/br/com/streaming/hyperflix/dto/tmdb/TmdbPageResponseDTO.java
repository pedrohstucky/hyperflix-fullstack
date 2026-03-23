package br.com.streaming.hyperflix.dto.tmdb;

import lombok.Data;

import java.util.List;

@Data
public class TmdbPageResponseDTO {
    private Integer page;
    private List<TmdbResultDTO> results;
}
