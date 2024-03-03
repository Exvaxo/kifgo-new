export default function uppercaseFirstLetter(word: string) {
  return word
    .split("")
    .map((letter, idx) => (idx === 0 ? letter.toUpperCase() : letter))
    .join("");
}
