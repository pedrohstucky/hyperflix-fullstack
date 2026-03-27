package br.com.streaming.hyperflix.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TitleDetailsResponseDTO {
    private Long id;
    private String title;
    private String overview;
    private String posterUrl;
    private String backdropUrl;
    private Double rating;
    private Integer year;
    private String type;
    private Integer runtime;
    private Integer seasons;
    private List<String> genres;
}
