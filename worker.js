self.onmessage = (ev) => {
    console.log("le thread principal a envoyé au message");
    self.postMessage("coucou");
}