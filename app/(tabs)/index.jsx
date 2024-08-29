import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image, FlatList, Dimensions, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cards } from './Dados';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
        padding: 10,
    },
    selectedCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    selectedCard: {
        backgroundColor: '#e0f7fa',
        borderRadius: 15,
        elevation: 6,
        margin: 5,
        padding: 8,
        width: width * 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderColor: '#4a90e2',
        borderWidth: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        elevation: 6,
        margin: 5,
        padding: 8,
        width: width * 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderColor: '#4a90e2',
        borderWidth: 1,
    },
    cardImage: {
        width: '100%',
        height: width * 0.25,
        borderRadius: 10,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#4a90e2',
    },
    cardContent: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333333',
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 6,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginVertical: 3,
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 12,
    },
    startButton: {
        backgroundColor: '#007aff',
        padding: 12,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginVertical: 20,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardList: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    noSelectionText: {
        fontSize: 14,
        color: '#777777',
    },
    flatListContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333333',
    },
});

const CharacterSelectionScreen = () => {
    const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
    const [selectedOpponentCard, setSelectedOpponentCard] = useState(null);
    const [result, setResult] = useState('');
    const navigation = useNavigation();

    const handleSelectCard = (card, type) => {
        if (type === 'player') {
            setSelectedPlayerCard(card);
        } else {
            setSelectedOpponentCard(card);
        }
    };

    const handleStartBattle = () => {
        if (selectedPlayerCard && selectedOpponentCard) {
            const playerPower = selectedPlayerCard.power;
            const opponentPower = selectedOpponentCard.power;

            let resultMessage = '';
            if (playerPower > opponentPower) {
                resultMessage = `${selectedPlayerCard.name} venceu com poder ${playerPower}!`;
            } else if (playerPower < opponentPower) {
                resultMessage = `${selectedOpponentCard.name} venceu com poder ${opponentPower}!`;
            } else {
                resultMessage = 'Empate! Ambos têm o mesmo poder.';
            }

            setResult(resultMessage);
        } else {
            Alert.alert('Seleção Incompleta', 'Por favor, selecione uma carta para o jogador e uma para o oponente.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ fontSize: 22, marginBottom: 20, color: '#4a90e2', fontWeight: '700' }}>
                Selecione suas cartas
            </Text>
            <View style={styles.selectedCardContainer}>
                <View style={styles.selectedCard}>
                    <Text style={styles.cardTitle}>Carta do Jogador</Text>
                    {selectedPlayerCard ? (
                        <>
                            <Image style={styles.cardImage} source={{ uri: selectedPlayerCard.image }} />
                            <Text style={styles.cardContent}>{selectedPlayerCard.name}</Text>
                            <Text style={styles.cardContent}>Poder: {selectedPlayerCard.power}</Text>
                        </>
                    ) : (
                        <Text style={styles.noSelectionText}>Nenhuma carta selecionada</Text>
                    )}
                </View>
                <View style={styles.selectedCard}>
                    <Text style={styles.cardTitle}>Carta do Oponente</Text>
                    {selectedOpponentCard ? (
                        <>
                            <Image style={styles.cardImage} source={{ uri: selectedOpponentCard.image }} />
                            <Text style={styles.cardContent}>{selectedOpponentCard.name}</Text>
                            <Text style={styles.cardContent}>Poder: {selectedOpponentCard.power}</Text>
                        </>
                    ) : (
                        <Text style={styles.noSelectionText}>Nenhuma carta selecionada</Text>
                    )}
                </View>
            </View>
            <FlatList
                data={cards}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image style={styles.cardImage} source={{ uri: item.image }} />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardContent}>Poder: {item.power}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => handleSelectCard(item, 'player')}
                        >
                            <Text style={styles.buttonText}>Selecionar como Jogador</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => handleSelectCard(item, 'opponent')}
                        >
                            <Text style={styles.buttonText}>Selecionar como Oponente</Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
            <Pressable
                style={[styles.startButton, { backgroundColor: selectedPlayerCard && selectedOpponentCard ? '#007aff' : '#a0a0a0' }]}
                onPress={handleStartBattle}
                disabled={!selectedPlayerCard || !selectedOpponentCard}
            >
                <Text style={styles.buttonText}>Começar Batalha</Text>
            </Pressable>
            {result ? (
                <Text style={styles.resultText}>{result}</Text>
            ) : null}
        </ScrollView>
    );
};

export default CharacterSelectionScreen;
