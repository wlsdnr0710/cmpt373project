package com.earth.cbr.config;
import com.alibaba.fastjson.JSONObject;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

@Configuration
public class FirebaseInitializer {

    @Autowired
    private Environment env;

    private String type;
    private String project_id;
    private String private_key_id;
    private String private_key;
    private String client_email;
    private String client_id;
    private String auth_uri;
    private String token_uri;
    private String auth_provider_x509_cert_url;
    private String client_x509_cert_url;

    @PostConstruct
    private void initDB() throws IOException {
        this.type = env.getProperty("spring.datasource.firebaseConfig.type");
        this.project_id = env.getProperty("spring.datasource.firebaseConfig.project_id");
        this.private_key_id = env.getProperty("spring.datasource.firebaseConfig.private_key_id");
        this.private_key = env.getProperty("spring.datasource.firebaseConfig.private_key");
        this.client_email = env.getProperty("spring.datasource.firebaseConfig.client_email");
        this.client_id = env.getProperty("spring.datasource.firebaseConfig.client_id");
        this.auth_uri = env.getProperty("spring.datasource.firebaseConfig.auth_uri");
        this.token_uri = env.getProperty("spring.datasource.firebaseConfig.token_uri");
        this.auth_provider_x509_cert_url = env.getProperty("spring.datasource.firebaseConfig.auth_provider_x509_cert_url");
        this.client_x509_cert_url = env.getProperty("spring.datasource.firebaseConfig.client_x509_cert_url");

        JSONObject firebaseConfig = new JSONObject();
        firebaseConfig.put("type", type);
        firebaseConfig.put("project_id", project_id);
        firebaseConfig.put("private_key_id", private_key_id);
        firebaseConfig.put("private_key", private_key);
        firebaseConfig.put("client_email", client_email);
        firebaseConfig.put("client_id", client_id);
        firebaseConfig.put("auth_uri", auth_uri);
        firebaseConfig.put("token_uri", token_uri);
        firebaseConfig.put("auth_provider_x509_cert_url", auth_provider_x509_cert_url);
        firebaseConfig.put("client_x509_cert_url", client_x509_cert_url);

        String curDir = new java.io.File(".").getCanonicalPath();
        ClassPathResource classPathResource = new ClassPathResource("firebaseServiceAccountKey.json");
        FileWriter file = new FileWriter(classPathResource.getFile());
        file.write(firebaseConfig.toJSONString());
        file.flush();
        FileInputStream serviceAccount =
                new FileInputStream(classPathResource.getFile());

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        FirebaseApp.initializeApp(options);
    }
}
