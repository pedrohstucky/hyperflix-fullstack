package br.com.streaming.hyperflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class HyperflixApplication {

	public static void main(String[] args) {
		SpringApplication.run(HyperflixApplication.class, args);
	}

}
