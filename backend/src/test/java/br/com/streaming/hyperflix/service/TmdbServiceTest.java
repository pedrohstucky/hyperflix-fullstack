package br.com.streaming.hyperflix.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestClient;


import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TmdbServiceTest {

    @Mock
    private RestClient restClient;

    @InjectMocks
    private TmdbService tmdbService;

    @Test
    @DisplayName("Deve lançar IllegalArgumentException quando o tipo for inválido")
    void shouldThrowExceptionForInvalidType() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> tmdbService.getTitleDetails("invalid_type", 1L)
        );

        assertEquals("Type must be 'movie' or 'tv'", exception.getMessage());
    }
}