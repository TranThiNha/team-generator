import { Player } from "../types";

export function savePlayerToStorage(player: Player) {
    if (player.isAdding) {
        localStorage.setItem(`player-add-${player.id}`, player.name);
    }

    if (player.score && player.score > 0) {
        localStorage.setItem(`player-${player.id}`, player.score.toString());
    }
}
