const adjectives = ['Mighty', 'Swift', 'Brave', 'Wise', 'Clever', 'Bright'];
const nouns = ['Tiger', 'Eagle', 'Lion', 'Shark', 'Falcon', 'Wolf'];

function generateUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${randomNum}`;
}
export default generateUsername;