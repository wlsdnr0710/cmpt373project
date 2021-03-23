package com.earth.cbr.controllers;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;


@Service
public class FirebaseInitializer {

    @PostConstruct
    private void initDB() throws IOException {
        String curDir = new java.io.File(".").getCanonicalPath();
        FileInputStream serviceAccount =
                new FileInputStream(curDir +"/src/main/java/com/earth/cbr/models/authentication/firebaseServiceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
    }

}
