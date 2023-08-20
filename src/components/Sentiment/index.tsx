import React from "react";
import { Text, View } from "react-native";
import { sentiments } from "../../utils/sentiments";
import { styles } from "./styles";

export type SCORE_TAG = "P+" | "P" | "NEU" | "N" | "N+" | "NONE";
export type IRONY = "NONIRONIC" | "IRONIC";

type Props = {
    score: SCORE_TAG;
};

const Sentiment: React.FC<Props> = ({ score }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>{sentiments[score].emoji}</Text>
            <Text style={styles.sentiment}>{sentiments[score].name}</Text>
        </View>
    );
};

export default Sentiment;
