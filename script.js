function playSound(score) {
    const audio = new Audio(`sounds/${score}.mp3`);
    audio.play();
}
