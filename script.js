function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const body = encodeURIComponent(message);
  const mailtoLink = `mailto:${email}?body=${body}`;
  window.location.href = mailtoLink;
}
