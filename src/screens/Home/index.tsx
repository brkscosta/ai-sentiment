import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { getLocales } from "expo-localization";
import Sentiment, { IRONY, SCORE_TAG } from "../../components/Sentiment";
import { styles } from "./styles";

type MeaningCloudResponse = {
    score_tag: SCORE_TAG | null;

    //Describes the request outcome in terms of success or failure.
    status: {
        code: number; // Numerical value of result code. Refer to the error code catalog.
        msg: string; // Human-readable error code, if any, orOK.
        credits: number; // Credits consumed by the request. A credit corresponds to a bucket of 500 words.
    };
    irony: IRONY;
    confidence: number;
};

const Home: React.FC = () => {
    const [score, setScore] = useState<SCORE_TAG | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSetMessage = (message: string) => {
        setMessage(message);
        if (message.length === 0) {
            setScore(null);
        }
    };

    const handleSendMensage = async () => {
        try {
            setIsLoading(true);
            // Access the environment variable
            const apiKey = process.env.EXPO_PUBLIC_MEANING_CLOUD_API_KEY;
            const url = process.env.EXPO_PUBLIC_MEANING_CLOUD_API_URL;

            if (!apiKey || !url) {
                console.log("No API key or URL specified");
                return;
            }

            const formData = new FormData();
            formData.append("key", apiKey);
            formData.append("txt", message);
            formData.append("lang", getLocales()[0].languageCode);

            const response = await axios.post<MeaningCloudResponse>(
                url,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );

            setScore(response.data.score_tag);
            console.log(score);
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Message</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleSetMessage}
                        placeholder="Type your message"
                        multiline
                    />

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        disabled={isLoading}
                        onPress={handleSendMensage}
                    >
                        {isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <FontAwesome
                                name="send"
                                size={24}
                                color="#FFF"
                                style={styles.icon}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                {score && <Sentiment score={score} />}
            </ScrollView>
        </View>
    );
};

export default Home;
