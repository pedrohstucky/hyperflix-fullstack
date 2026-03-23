package br.com.streaming.hyperflix.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoviePageResponseDTO {
    private Integer page;
    private Integer totalPages;
    private List<MovieResponseDTO> results;
}
