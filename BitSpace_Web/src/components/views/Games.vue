<template>
    <div class="games-container">
        <h1>Games</h1>
        <div class="games-grid">
            <div v-for="game in games" :key="game.id" class="game-card">
                <h2>{{ game.title }}</h2>
                <p>{{ game.description }}</p>
                <button @click="playGame(game.id)">Play</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Games',
    data() {
        return {
            games: [
                { id: 1, title: 'Game 1', description: 'Description here' },
                { id: 2, title: 'Game 2', description: 'Description here' },
                { id: 3, title: 'Game 3', description: 'Description here' }
            ]
        }
    },
    methods: {
        playGame(gameId) {
            console.log(`Playing game ${gameId}`);
        }
    }
}
</script>

<style scoped>
.games-container {
    padding: 20px;
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.game-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.game-card button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.game-card button:hover {
    background-color: #0056b3;
}
</style>