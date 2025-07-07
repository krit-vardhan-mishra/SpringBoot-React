package com.wellbeing_waitlist.service;

import java.io.*;
import org.springframework.stereotype.Service;

@Service
public class EmergencyLevelService {

    public int calculateEmergencyLevel(String problem) {
        try {
            String scriptPath = new File("src/main/resources/scripts/EmergencyLevel.py").getAbsolutePath();
            ProcessBuilder processBuilder = new ProcessBuilder("python", scriptPath, problem);
            processBuilder.directory(new File("src/main/resources/scripts"));
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String strScore = reader.readLine();
            reader.close();

            StringBuilder errorMessage = new StringBuilder();
            String errorLine;

            while ((errorLine = errorReader.readLine()) != null) {
                errorMessage.append(errorLine);
            }

            errorReader.close();
            int exitCode = process.waitFor();

            if (errorMessage.length() > 0 || exitCode != 0) {
                System.err.println("Error From Python Script: " + errorMessage);
                return -1;
            }

            return Integer.parseInt(strScore.trim());
        } catch (IOException | NumberFormatException | InterruptedException e) {
            e.printStackTrace();
            return -1;
        }
    }
}
