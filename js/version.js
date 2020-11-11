const VERSION = "1.0.1";

function getVersion() {
  if (document.location.href.startsWith("http://localhost")) {
    return Math.floor(Math.random() * 1000000);
  } else {
    return VERSION;
  }
}